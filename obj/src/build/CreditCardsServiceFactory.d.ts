import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class CreditCardsServiceFactory extends Factory {
    static Descriptor: Descriptor;
    static MemoryPersistenceDescriptor: Descriptor;
    static FilePersistenceDescriptor: Descriptor;
    static MongoDbPersistenceDescriptor: Descriptor;
    static PayPalPersistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static SenecaServiceDescriptor: Descriptor;
    static HttpServiceDescriptor: Descriptor;
    constructor();
}
