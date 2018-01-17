"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class CreditCardsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('creditcards');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-creditcards', 'controller', 'default', '*', '1.0'));
    }
}
exports.CreditCardsHttpServiceV1 = CreditCardsHttpServiceV1;
//# sourceMappingURL=CreditCardsHttpServiceV1.js.map