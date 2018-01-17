"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const CreditCardV1Schema_1 = require("../data/version1/CreditCardV1Schema");
class CreditCardsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetCreditCardsCommand());
        this.addCommand(this.makeGetCreditCardByIdCommand());
        this.addCommand(this.makeCreateCreditCardCommand());
        this.addCommand(this.makeUpdateCreditCardCommand());
        this.addCommand(this.makeDeleteCreditCardByIdCommand());
    }
    makeGetCreditCardsCommand() {
        return new pip_services_commons_node_2.Command("get_creditcards", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getCreditCards(correlationId, filter, paging, callback);
        });
    }
    makeGetCreditCardByIdCommand() {
        return new pip_services_commons_node_2.Command("get_creditcard_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let card_id = args.getAsString("card_id");
            this._logic.getCreditCardById(correlationId, card_id, callback);
        });
    }
    makeCreateCreditCardCommand() {
        return new pip_services_commons_node_2.Command("create_creditcard", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card', new CreditCardV1Schema_1.CreditCardV1Schema()), (correlationId, args, callback) => {
            let card = args.get("card");
            this._logic.createCreditCard(correlationId, card, callback);
        });
    }
    makeUpdateCreditCardCommand() {
        return new pip_services_commons_node_2.Command("update_creditcard", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card', new CreditCardV1Schema_1.CreditCardV1Schema()), (correlationId, args, callback) => {
            let card = args.get("card");
            this._logic.updateCreditCard(correlationId, card, callback);
        });
    }
    makeDeleteCreditCardByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_creditcard_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let cardId = args.getAsNullableString("card_id");
            this._logic.deleteCreditCardById(correlationId, cardId, callback);
        });
    }
}
exports.CreditCardsCommandSet = CreditCardsCommandSet;
//# sourceMappingURL=CreditCardsCommandSet.js.map