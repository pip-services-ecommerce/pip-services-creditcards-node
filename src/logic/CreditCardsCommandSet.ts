import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { CreditCardV1 } from '../data/version1/CreditCardV1';
import { CreditCardV1Schema } from '../data/version1/CreditCardV1Schema';
import { ICreditCardsController } from './ICreditCardsController';

export class CreditCardsCommandSet extends CommandSet {
    private _logic: ICreditCardsController;

    constructor(logic: ICreditCardsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetCreditCardsCommand());
		this.addCommand(this.makeGetCreditCardByIdCommand());
		this.addCommand(this.makeCreateCreditCardCommand());
		this.addCommand(this.makeUpdateCreditCardCommand());
		this.addCommand(this.makeDeleteCreditCardByIdCommand());
    }

	private makeGetCreditCardsCommand(): ICommand {
		return new Command(
			"get_credit_cards",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getCreditCards(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetCreditCardByIdCommand(): ICommand {
		return new Command(
			"get_credit_card_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('card_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let cardId = args.getAsString("card_id");
                let customerId = args.getAsString("customer_id");
                this._logic.getCreditCardById(correlationId, cardId, customerId, callback);
            }
		);
	}

	private makeCreateCreditCardCommand(): ICommand {
		return new Command(
			"create_credit_card",
			new ObjectSchema(true)
				.withRequiredProperty('card', new CreditCardV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let card = args.get("card");
                this._logic.createCreditCard(correlationId, card, callback);
            }
		);
	}

	private makeUpdateCreditCardCommand(): ICommand {
		return new Command(
			"update_credit_card",
			new ObjectSchema(true)
				.withRequiredProperty('card', new CreditCardV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let card = args.get("card");
                this._logic.updateCreditCard(correlationId, card, callback);
            }
		);
	}
	
	private makeDeleteCreditCardByIdCommand(): ICommand {
		return new Command(
			"delete_credit_card_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('card_id', TypeCode.String)
				.withRequiredProperty('customer_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let cardId = args.getAsNullableString("card_id");
                let customerId = args.getAsString("customer_id");
                this._logic.deleteCreditCardById(correlationId, cardId, customerId, callback);
			}
		);
	}

}