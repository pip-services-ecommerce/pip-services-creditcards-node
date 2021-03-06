import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class CreditCardsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/credit_cards');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-creditcards', 'controller', 'default', '*', '1.0'));
    }
}