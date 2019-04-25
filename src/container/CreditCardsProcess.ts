import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { CreditCardsServiceFactory } from '../build/CreditCardsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class CreditCardsProcess extends ProcessContainer {

    public constructor() {
        super("credit_cards", "Credit cards microservice");
        this._factories.add(new CreditCardsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
