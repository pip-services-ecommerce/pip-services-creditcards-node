import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';

import { CreditCardV1 } from '../data/version1/CreditCardV1';
import { CreditCardStateV1 } from '../data/version1/CreditCardStateV1';
import { ICreditCardsPersistence } from '../persistence/ICreditCardsPersistence';
import { ICreditCardsController } from './ICreditCardsController';
import { CreditCardsCommandSet } from './CreditCardsCommandSet';

export class CreditCardsController implements  IConfigurable, IReferenceable, ICommandable, ICreditCardsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-creditcards:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(CreditCardsController._defaultConfig);
    private _persistence: ICreditCardsPersistence;
    private _commandSet: CreditCardsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ICreditCardsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new CreditCardsCommandSet(this);
        return this._commandSet;
    }
    
    public getCreditCards(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<CreditCardV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getCreditCardById(correlationId: string, id: string, 
        callback: (err: any, card: CreditCardV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);        
    }

    public createCreditCard(correlationId: string, card: CreditCardV1, 
        callback: (err: any, creditcard: CreditCardV1) => void): void {

        card.state = card.state || CreditCardStateV1.Ok;
        card.create_time = new Date();
        card.update_time = new Date();

        this._persistence.create(correlationId, card, callback);
    }

    public updateCreditCard(correlationId: string, card: CreditCardV1, 
        callback: (err: any, creditcard: CreditCardV1) => void): void {

        card.state = card.state || CreditCardStateV1.Ok;
        card.update_time = new Date();
    
        this._persistence.update(correlationId, card, callback);
    }

    public deleteCreditCardById(correlationId: string, id: string,
        callback: (err: any, card: CreditCardV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
