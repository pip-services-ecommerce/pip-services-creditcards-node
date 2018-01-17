"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const CreditCardsMongoDbSchema_1 = require("./CreditCardsMongoDbSchema");
class CreditCardsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('credit_cards', CreditCardsMongoDbSchema_1.CreditCardsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
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
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null, callback);
    }
}
exports.CreditCardsMongoDbPersistence = CreditCardsMongoDbPersistence;
//# sourceMappingURL=CreditCardsMongoDbPersistence.js.map