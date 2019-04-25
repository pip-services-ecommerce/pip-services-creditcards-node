import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { CreditCardsServiceFactory } from '../build/CreditCardsServiceFactory';

export class CreditCardsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("credit_cards", "Credit cards function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-creditcards', 'controller', 'default', '*', '*'));
        this._factories.add(new CreditCardsServiceFactory());
    }
}

export const handler = new CreditCardsLambdaFunction().getHandler();