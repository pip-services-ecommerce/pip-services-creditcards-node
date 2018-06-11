import { CommandSet } from 'pip-services-commons-node';
import { ICreditCardsController } from './ICreditCardsController';
export declare class CreditCardsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ICreditCardsController);
    private makeGetCreditCardsCommand();
    private makeGetCreditCardByIdCommand();
    private makeCreateCreditCardCommand();
    private makeUpdateCreditCardCommand();
    private makeDeleteCreditCardByIdCommand();
}
