"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const CreditCardsMemoryPersistence_1 = require("../persistence/CreditCardsMemoryPersistence");
const CreditCardsFilePersistence_1 = require("../persistence/CreditCardsFilePersistence");
const CreditCardsMongoDbPersistence_1 = require("../persistence/CreditCardsMongoDbPersistence");
const CreditCardsController_1 = require("../logic/CreditCardsController");
const CreditCardsSenecaServiceV1_1 = require("../services/version1/CreditCardsSenecaServiceV1");
class CreditCardsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-creditcards', seneca, CreditCardsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new CreditCardsController_1.CreditCardsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new CreditCardsMongoDbPersistence_1.CreditCardsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new CreditCardsFilePersistence_1.CreditCardsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new CreditCardsMemoryPersistence_1.CreditCardsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new CreditCardsSenecaServiceV1_1.CreditCardsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-creditcards', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-creditcards', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-creditcards', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.CreditCardsSenecaPlugin = CreditCardsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new CreditCardsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=CreditCardsSenecaPlugin.js.map