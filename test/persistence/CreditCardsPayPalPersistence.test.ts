let paypal = require('paypal-rest-sdk');

import { ConfigParams } from 'pip-services-commons-node';

import { CreditCardsPayPalPersistence } from '../../src/persistence/CreditCardsPayPalPersistence';
import { CreditCardsPersistenceFixture } from './CreditCardsPersistenceFixture';

suite('CreditCardsPayPalPersistence', ()=> {
    var PAYPAL_ACCESS_ID = process.env["PAYPAL_ACCESS_ID"] || "";
    var PAYPAL_ACCESS_KEY = process.env["PAYPAL_ACCESS_KEY"] || "";

    if (!PAYPAL_ACCESS_ID || !PAYPAL_ACCESS_KEY)
        return;

    var config = ConfigParams.fromTuples(
        'credential.access_id', PAYPAL_ACCESS_ID,
        'credential.access_key', PAYPAL_ACCESS_KEY,
        'options.sandbox', true
    );

    let persistence: CreditCardsPayPalPersistence;
    let fixture: CreditCardsPersistenceFixture;
    
    suiteSetup((done) => {
        persistence = new CreditCardsPayPalPersistence();
        persistence.configure(config);
        
        fixture = new CreditCardsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    suiteTeardown((done) => {
        persistence.close(null, done);
    });

    setup((done) => {
        persistence.clear(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});