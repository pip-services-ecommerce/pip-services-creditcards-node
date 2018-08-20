import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { CreditCardsServiceFactory } from '../build/CreditCardsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class CreditCardsProcess extends ProcessContainer {

    public constructor() {
        super("credit_cards", "Credit cards microservice");
        this._factories.add(new CreditCardsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
