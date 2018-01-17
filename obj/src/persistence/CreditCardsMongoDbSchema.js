"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.CreditCardsMongoDbSchema = function (collection) {
    collection = collection || 'credit_cards';
    let AddressSchema = new mongoose_1.Schema({
        line1: { type: String, required: true },
        line2: { type: String, required: false },
        city: { type: String, required: true },
        zip: { type: String, required: false },
        postal_code: { type: String, required: false },
        country_code: { type: String, required: true }
    });
    AddressSchema.set('toJSON', {
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String },
        customer_id: { type: String, required: true },
        /* Auto managed fields */
        create_time: { type: Date, required: false },
        update_time: { type: Date, required: false },
        /* Content */
        type: { type: String, required: false },
        number: { type: String, required: false },
        expire_month: { type: Number, required: false },
        expire_year: { type: Number, required: false },
        first_name: { type: String, required: false },
        last_name: { type: String, required: false },
        billing_address: { type: AddressSchema, required: false },
        state: { type: String, required: false },
        cvc: { type: String, required: false },
        /* Management  */
        name: { type: String, required: false },
        saved: { type: Boolean, required: false },
        default: { type: Boolean, required: false },
    }, {
        collection: collection,
        autoIndex: true
    });
    schema.index({ customer_id: 1 });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=CreditCardsMongoDbSchema.js.map