import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-seneca-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { CreditCardsMemoryPersistence } from '../persistence/CreditCardsMemoryPersistence';
import { CreditCardsFilePersistence } from '../persistence/CreditCardsFilePersistence';
import { CreditCardsMongoDbPersistence } from '../persistence/CreditCardsMongoDbPersistence';
import { CreditCardsController } from '../logic/CreditCardsController';
import { CreditCardsSenecaServiceV1 } from '../services/version1/CreditCardsSenecaServiceV1';

export class CreditCardsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-creditcards', seneca, CreditCardsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new CreditCardsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new CreditCardsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new CreditCardsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new CreditCardsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new CreditCardsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-creditcards', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-creditcards', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-creditcards', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new CreditCardsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}