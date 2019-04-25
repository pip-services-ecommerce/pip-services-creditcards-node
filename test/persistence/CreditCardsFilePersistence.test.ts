import { ConfigParams } from 'pip-services3-commons-node';

import { CreditCardsFilePersistence } from '../../src/persistence/CreditCardsFilePersistence';
import { CreditCardsPersistenceFixture } from './CreditCardsPersistenceFixture';

suite('CreditCardsFilePersistence', ()=> {
    let persistence: CreditCardsFilePersistence;
    let fixture: CreditCardsPersistenceFixture;
    
    setup((done) => {
        persistence = new CreditCardsFilePersistence('./data/credit_cards.test.json');

        fixture = new CreditCardsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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