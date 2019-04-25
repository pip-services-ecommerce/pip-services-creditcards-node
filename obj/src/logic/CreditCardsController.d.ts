import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { CreditCardV1 } from '../data/version1/CreditCardV1';
import { ICreditCardsController } from './ICreditCardsController';
export declare class CreditCardsController implements IConfigurable, IReferenceable, ICommandable, ICreditCardsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getCreditCards(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CreditCardV1>) => void): void;
    getCreditCardById(correlationId: string, id: string, customerId: string, callback: (err: any, card: CreditCardV1) => void): void;
    createCreditCard(correlationId: string, card: CreditCardV1, callback: (err: any, credit_card: CreditCardV1) => void): void;
    updateCreditCard(correlationId: string, card: CreditCardV1, callback: (err: any, credit_card: CreditCardV1) => void): void;
    deleteCreditCardById(correlationId: string, id: string, customerId: string, callback: (err: any, card: CreditCardV1) => void): void;
}
