import { ConfigParams } from 'pip-services-commons-node';

import { CreditCardsMemoryPersistence } from '../../src/persistence/CreditCardsMemoryPersistence';
import { CreditCardsPersistenceFixture } from './CreditCardsPersistenceFixture';

suite('CreditCardsMemoryPersistence', ()=> {
    let persistence: CreditCardsMemoryPersistence;
    let fixture: CreditCardsPersistenceFixture;
    
    setup((done) => {
        persistence = new CreditCardsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new CreditCardsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});