"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const AddressV1Schema_1 = require("./AddressV1Schema");
class CreditCardV1Schema extends pip_services3_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('customer_id', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);
        this.withRequiredProperty('type', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('number', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('expire_month', pip_services3_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('expire_year', pip_services3_commons_node_2.TypeCode.Integer);
        this.withRequiredProperty('first_name', pip_services3_commons_node_2.TypeCode.String);
        this.withRequiredProperty('last_name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('billing_address', new AddressV1Schema_1.AddressV1Schema());
        this.withOptionalProperty('state', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('ccv', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services3_commons_node_2.TypeCode.String);
        this.withOptionalProperty('saved', pip_services3_commons_node_2.TypeCode.Boolean);
        this.withOptionalProperty('default', pip_services3_commons_node_2.TypeCode.Boolean);
    }
}
exports.CreditCardV1Schema = CreditCardV1Schema;
//# sourceMappingURL=CreditCardV1Schema.js.map