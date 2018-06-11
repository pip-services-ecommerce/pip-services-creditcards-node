import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class AddressV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withRequiredProperty('line1', TypeCode.String);
        this.withOptionalProperty('line2', TypeCode.String);
        this.withRequiredProperty('city', TypeCode.String);
        this.withOptionalProperty('state', TypeCode.String);
        this.withOptionalProperty('postal_code', TypeCode.String);
        this.withRequiredProperty('country_code', TypeCode.String);
    }
}
