"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const CreditCardsServiceFactory_1 = require("../build/CreditCardsServiceFactory");
class CreditCardsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("credit_cards", "Credit cards microservice");
        this._factories.add(new CreditCardsServiceFactory_1.CreditCardsServiceFactory);
    }
}
exports.CreditCardsProcess = CreditCardsProcess;
//# sourceMappingURL=CreditCardsProcess.js.map