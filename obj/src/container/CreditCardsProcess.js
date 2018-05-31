"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const CreditCardsServiceFactory_1 = require("../build/CreditCardsServiceFactory");
class CreditCardsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("credit_cards", "Credit cards microservice");
        this._factories.add(new CreditCardsServiceFactory_1.CreditCardsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.CreditCardsProcess = CreditCardsProcess;
//# sourceMappingURL=CreditCardsProcess.js.map