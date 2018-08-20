let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-mongodb-node';

import { CreditCardV1 } from '../data/version1/CreditCardV1';
import { ICreditCardsPersistence } from './ICreditCardsPersistence';
import { CreditCardsMongoDbSchema } from './CreditCardsMongoDbSchema';

export class CreditCardsMongoDbPersistence extends IdentifiableMongoDbPersistence<CreditCardV1, string> implements ICreditCardsPersistence {

    constructor() {
        super('credit_cards', CreditCardsMongoDbSchema());
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        // Filter ids
        let ids = filter.getAsObject('ids');
        if (_.isString(ids))
            ids = ids.split(',');
        if (_.isArray(ids))
            criteria.push({ _id: { $in: ids } });
            
        let state = filter.getAsNullableString('state');
        if (state != null)
            criteria.push({ state: state });

        let customerId = filter.getAsNullableString('customer_id');
        if (customerId != null)
            criteria.push({ customer_id: customerId });
                
        let saved = filter.getAsNullableBoolean('saved');
        if (saved != null)
            criteria.push({ saved: saved });

        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<CreditCardV1>) => void): void {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }

}
