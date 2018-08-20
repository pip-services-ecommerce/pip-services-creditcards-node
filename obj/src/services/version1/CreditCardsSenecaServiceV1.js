"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
class CreditCardsSenecaServiceV1 extends pip_services_seneca_node_1.CommandableSenecaService {
    constructor() {
        super('credit_cards');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-creditcards', 'controller', 'default', '*', '1.0'));
    }
}
exports.CreditCardsSenecaServiceV1 = CreditCardsSenecaServiceV1;
//# sourceMappingURL=CreditCardsSenecaServiceV1.js.map