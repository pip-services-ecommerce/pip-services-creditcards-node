"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const CreditCardStateV1_1 = require("../data/version1/CreditCardStateV1");
const CreditCardsCommandSet_1 = require("./CreditCardsCommandSet");
class CreditCardsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(CreditCardsController._defaultConfig);
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
    getCreditCardById(correlationId, id, customerId, callback) {
        this._persistence.getOneById(correlationId, id, (err, card) => {
            // Do not allow to access card of different customer
            if (card && card.customer_id != customerId)
                card = null;
            callback(err, card);
        });
    }
    createCreditCard(correlationId, card, callback) {
        card.state = card.state || CreditCardStateV1_1.CreditCardStateV1.Ok;
        card.create_time = new Date();
        card.update_time = new Date();
        this._persistence.create(correlationId, card, callback);
    }
    updateCreditCard(correlationId, card, callback) {
        let newCard;
        card.state = card.state || CreditCardStateV1_1.CreditCardStateV1.Ok;
        card.update_time = new Date();
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, card.id, (err, data) => {
                    if (err == null && data && data.customer_id != card.customer_id) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong credit card customer id')
                            .withDetails('id', card.id)
                            .withDetails('customer_id', card.customer_id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, card, (err, data) => {
                    newCard = data;
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, newCard);
        });
    }
    deleteCreditCardById(correlationId, id, customerId, callback) {
        let oldCard;
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, id, (err, data) => {
                    if (err == null && data && data.customer_id != customerId) {
                        err = new pip_services3_commons_node_3.BadRequestException(correlationId, 'WRONG_CUST_ID', 'Wrong credit card customer id')
                            .withDetails('id', id)
                            .withDetails('customer_id', customerId);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.deleteById(correlationId, id, (err, data) => {
                    oldCard = data;
                    callback(err);
                });
            }
        ], (err) => {
            if (callback)
                callback(err, oldCard);
        });
    }
}
CreditCardsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-creditcards:persistence:*:*:1.0');
exports.CreditCardsController = CreditCardsController;
//# sourceMappingURL=CreditCardsController.js.map