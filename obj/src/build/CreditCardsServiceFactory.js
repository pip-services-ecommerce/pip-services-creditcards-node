"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const CreditCardsMongoDbPersistence_1 = require("../persistence/CreditCardsMongoDbPersistence");
const CreditCardsFilePersistence_1 = require("../persistence/CreditCardsFilePersistence");
const CreditCardsMemoryPersistence_1 = require("../persistence/CreditCardsMemoryPersistence");
const CreditCardsController_1 = require("../logic/CreditCardsController");
const CreditCardsHttpServiceV1_1 = require("../services/version1/CreditCardsHttpServiceV1");
const CreditCardsSenecaServiceV1_1 = require("../services/version1/CreditCardsSenecaServiceV1");
class CreditCardsServiceFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(CreditCardsServiceFactory.MemoryPersistenceDescriptor, CreditCardsMemoryPersistence_1.CreditCardsMemoryPersistence);
        this.registerAsType(CreditCardsServiceFactory.FilePersistenceDescriptor, CreditCardsFilePersistence_1.CreditCardsFilePersistence);
        this.registerAsType(CreditCardsServiceFactory.MongoDbPersistenceDescriptor, CreditCardsMongoDbPersistence_1.CreditCardsMongoDbPersistence);
        this.registerAsType(CreditCardsServiceFactory.ControllerDescriptor, CreditCardsController_1.CreditCardsController);
        this.registerAsType(CreditCardsServiceFactory.SenecaServiceDescriptor, CreditCardsSenecaServiceV1_1.CreditCardsSenecaServiceV1);
        this.registerAsType(CreditCardsServiceFactory.HttpServiceDescriptor, CreditCardsHttpServiceV1_1.CreditCardsHttpServiceV1);
    }
}
CreditCardsServiceFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "factory", "default", "default", "1.0");
CreditCardsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "persistence", "memory", "*", "1.0");
CreditCardsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "persistence", "file", "*", "1.0");
CreditCardsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "persistence", "mongodb", "*", "1.0");
CreditCardsServiceFactory.PayPalPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "persistence", "paypal", "*", "1.0");
CreditCardsServiceFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "controller", "default", "*", "1.0");
CreditCardsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "service", "seneca", "*", "1.0");
CreditCardsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-creditcards", "service", "http", "*", "1.0");
exports.CreditCardsServiceFactory = CreditCardsServiceFactory;
//# sourceMappingURL=CreditCardsServiceFactory.js.map