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
        return new pip_services_commons_node_2.Command("get_credit_cards", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getCreditCards(correlationId, filter, paging, callback);
        });
    }
    makeGetCreditCardByIdCommand() {
        return new pip_services_commons_node_2.Command("get_credit_card_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let cardId = args.getAsString("card_id");
            let customerId = args.getAsString("customer_id");
            this._logic.getCreditCardById(correlationId, cardId, customerId, callback);
        });
    }
    makeCreateCreditCardCommand() {
        return new pip_services_commons_node_2.Command("create_credit_card", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card', new CreditCardV1Schema_1.CreditCardV1Schema()), (correlationId, args, callback) => {
            let card = args.get("card");
            this._logic.createCreditCard(correlationId, card, callback);
        });
    }
    makeUpdateCreditCardCommand() {
        return new pip_services_commons_node_2.Command("update_credit_card", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card', new CreditCardV1Schema_1.CreditCardV1Schema()), (correlationId, args, callback) => {
            let card = args.get("card");
            this._logic.updateCreditCard(correlationId, card, callback);
        });
    }
    makeDeleteCreditCardByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_credit_card_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('card_id', pip_services_commons_node_6.TypeCode.String)
            .withRequiredProperty('customer_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let cardId = args.getAsNullableString("card_id");
            let customerId = args.getAsString("customer_id");
            this._logic.deleteCreditCardById(correlationId, cardId, customerId, callback);
        });
    }
}
exports.CreditCardsCommandSet = CreditCardsCommandSet;
//# sourceMappingURL=CreditCardsCommandSet.js.map