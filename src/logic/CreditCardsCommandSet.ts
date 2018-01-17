import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

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
			"get_creditcards",
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
			"get_creditcard_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('card_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let card_id = args.getAsString("card_id");
                this._logic.getCreditCardById(correlationId, card_id, callback);
            }
		);
	}

	private makeCreateCreditCardCommand(): ICommand {
		return new Command(
			"create_creditcard",
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
			"update_creditcard",
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
			"delete_creditcard_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('card_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let cardId = args.getAsNullableString("card_id");
                this._logic.deleteCreditCardById(correlationId, cardId, callback);
			}
		);
	}

}