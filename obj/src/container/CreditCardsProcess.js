"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const CreditCardsServiceFactory_1 = require("../build/CreditCardsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class CreditCardsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("credit_cards", "Credit cards microservice");
        this._factories.add(new CreditCardsServiceFactory_1.CreditCardsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.CreditCardsProcess = CreditCardsProcess;
//# sourceMappingURL=CreditCardsProcess.js.map