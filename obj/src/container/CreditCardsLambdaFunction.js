"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const CreditCardsServiceFactory_1 = require("../build/CreditCardsServiceFactory");
class CreditCardsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("creditcards", "Credit cards function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-creditcards', 'controller', 'default', '*', '*'));
        this._factories.add(new CreditCardsServiceFactory_1.CreditCardsServiceFactory());
    }
}
exports.CreditCardsLambdaFunction = CreditCardsLambdaFunction;
exports.handler = new CreditCardsLambdaFunction().getHandler();
//# sourceMappingURL=CreditCardsLambdaFunction.js.map