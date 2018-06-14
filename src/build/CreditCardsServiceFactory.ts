import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { CreditCardsMongoDbPersistence } from '../persistence/CreditCardsMongoDbPersistence';
import { CreditCardsFilePersistence } from '../persistence/CreditCardsFilePersistence';
import { CreditCardsMemoryPersistence } from '../persistence/CreditCardsMemoryPersistence';
import { CreditCardsPayPalPersistence } from '../persistence/CreditCardsPayPalPersistence';
import { CreditCardsController } from '../logic/CreditCardsController';
import { CreditCardsHttpServiceV1 } from '../services/version1/CreditCardsHttpServiceV1';
import { CreditCardsSenecaServiceV1 } from '../services/version1/CreditCardsSenecaServiceV1'; 

export class CreditCardsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-creditcards", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-creditcards", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-creditcards", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-creditcards", "persistence", "mongodb", "*", "1.0");
	public static PayPalPersistenceDescriptor = new Descriptor("pip-services-creditcards", "persistence", "paypal", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-creditcards", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-creditcards", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-creditcards", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(CreditCardsServiceFactory.MemoryPersistenceDescriptor, CreditCardsMemoryPersistence);
		this.registerAsType(CreditCardsServiceFactory.FilePersistenceDescriptor, CreditCardsFilePersistence);
		this.registerAsType(CreditCardsServiceFactory.MongoDbPersistenceDescriptor, CreditCardsMongoDbPersistence);
		this.registerAsType(CreditCardsServiceFactory.PayPalPersistenceDescriptor, CreditCardsPayPalPersistence);
		this.registerAsType(CreditCardsServiceFactory.ControllerDescriptor, CreditCardsController);
		this.registerAsType(CreditCardsServiceFactory.SenecaServiceDescriptor, CreditCardsSenecaServiceV1);
		this.registerAsType(CreditCardsServiceFactory.HttpServiceDescriptor, CreditCardsHttpServiceV1);
	}
	
}
