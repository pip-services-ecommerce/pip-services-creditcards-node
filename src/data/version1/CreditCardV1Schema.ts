import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { AddressV1Schema } from './AddressV1Schema';

export class CreditCardV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('customer_id', TypeCode.String);

        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        this.withOptionalProperty('update_time', null); //TypeCode.DateTime);

        this.withRequiredProperty('type', TypeCode.String);
        this.withRequiredProperty('number', TypeCode.String);
        this.withRequiredProperty('expire_month', TypeCode.Integer);
        this.withRequiredProperty('expire_year', TypeCode.Integer);
        this.withRequiredProperty('first_name', TypeCode.String);
        this.withRequiredProperty('last_name', TypeCode.String);
        this.withRequiredProperty('billing_address', new AddressV1Schema());
        this.withOptionalProperty('state', TypeCode.String);
        this.withOptionalProperty('cvc', TypeCode.String);

        this.withOptionalProperty('name', TypeCode.String);
        this.withOptionalProperty('saved', TypeCode.Boolean);
        this.withOptionalProperty('default', TypeCode.Boolean);
    }
}
