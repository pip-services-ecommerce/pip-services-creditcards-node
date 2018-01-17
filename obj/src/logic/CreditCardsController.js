"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const CreditCardStateV1_1 = require("../data/version1/CreditCardStateV1");
const CreditCardsCommandSet_1 = require("./CreditCardsCommandSet");
class CreditCardsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(CreditCardsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new CreditCardsCommandSet_1.CreditCardsCommandSet(this);
        return this._commandSet;
    }
    getCreditCards(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getCreditCardById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    createCreditCard(correlationId, card, callback) {
        card.state = card.state || CreditCardStateV1_1.CreditCardStateV1.Ok;
        card.create_time = new Date();
        card.update_time = new Date();
        this._persistence.create(correlationId, card, callback);
    }
    updateCreditCard(correlationId, card, callback) {
        card.state = card.state || CreditCardStateV1_1.CreditCardStateV1.Ok;
        card.update_time = new Date();
        this._persistence.update(correlationId, card, callback);
    }
    deleteCreditCardById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
CreditCardsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-creditcards:persistence:*:*:1.0');
exports.CreditCardsController = CreditCardsController;
//# sourceMappingURL=CreditCardsController.js.map