import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-node';
import { CreditCardV1 } from '../data/version1/CreditCardV1';
import { ICreditCardsPersistence } from './ICreditCardsPersistence';
export declare class CreditCardsMongoDbPersistence extends IdentifiableMongoDbPersistence<CreditCardV1, string> implements ICreditCardsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<CreditCardV1>) => void): void;
}
