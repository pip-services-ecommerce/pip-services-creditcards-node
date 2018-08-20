import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class CreditCardsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('credit_cards');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-creditcards', 'controller', 'default', '*', '1.0'));
    }
}