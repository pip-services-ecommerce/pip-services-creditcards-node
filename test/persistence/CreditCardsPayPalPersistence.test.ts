let paypal = require('paypal-rest-sdk');

import { ConfigParams } from 'pip-services-commons-node';

import { CreditCardsPayPalPersistence } from '../../src/persistence/CreditCardsPayPalPersistence';
import { CreditCardsPersistenceFixture } from './CreditCardsPersistenceFixture';

suite('CreditCardsPayPalPersistence', ()=> {
    let persistence: CreditCardsPayPalPersistence;
    let fixture: CreditCardsPersistenceFixture;
    
    suiteSetup((done) => {
        persistence = new CreditCardsPayPalPersistence();
        persistence.configure(ConfigParams.fromTuples(
            'credential.access_id', 'AXIuEtDAPKJMkesVnyZkHBPjcG0DETji_jwlyksBO6pr_lLW-WvISz1EerQL4MS_zubyWdJQofOYOpNj',
            'credential.access_key', 'EKmlVA7GvQHcD1R1Dk5qGHiQealLtiKuap0DjrP7sOdLxCchd_Jqj5OGq82Gh-f555ch2o1p9FXrXtcd',
            'options.sandbox', true
        ));
        
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