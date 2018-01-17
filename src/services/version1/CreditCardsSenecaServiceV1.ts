import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class CreditCardsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('creditcards');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-creditcards', 'controller', 'default', '*', '1.0'));
    }
}