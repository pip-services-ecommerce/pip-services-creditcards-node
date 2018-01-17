import { YamlConfigReader } from 'pip-services-commons-node';

import { CreditCardsMongoDbPersistence } from '../../src/persistence/CreditCardsMongoDbPersistence';
import { CreditCardsPersistenceFixture } from './CreditCardsPersistenceFixture';

suite('CreditCardsMongoDbPersistence', ()=> {
    let persistence: CreditCardsMongoDbPersistence;
    let fixture: CreditCardsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new CreditCardsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new CreditCardsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
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