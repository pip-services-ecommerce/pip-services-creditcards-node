let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { CreditCardV1 } from '../../src/data/version1/CreditCardV1';
import { CreditCardTypeV1 } from '../../src/data/version1/CreditCardTypeV1';
import { CreditCardStateV1 } from '../../src/data/version1/CreditCardStateV1';

import { ICreditCardsPersistence } from '../../src/persistence/ICreditCardsPersistence';
import { AddressV1 } from '../../src/data/version1/AddressV1';

let CREDIT_CARD1: CreditCardV1 = {
    id: '1',
    customer_id: '1',
    type: CreditCardTypeV1.Visa,
    number: '4032036094894795',
    expire_month: 1,
    expire_year: 2021,
    first_name: 'Bill',
    last_name: 'Gates',
    billing_address: {
        line1: '2345 Swan Rd',
        city: 'Tucson',
        state: 'AZ',
        postal_code: '85710',
        country_code: 'US'
    },
    ccv: '213',
    name: 'Test Card 1',
    saved: true,
    default: true,
    state: CreditCardStateV1.Ok
};
let CREDIT_CARD2: CreditCardV1 = {
    id: '2',
    customer_id: '1',
    type: CreditCardTypeV1.Visa,
    number: '4032037578262780',
    expire_month: 4,
    expire_year: 2028,
    first_name: 'Joe',
    last_name: 'Dow',
    billing_address: {
        line1: '123 Broadway Blvd',
        city: 'New York',
        state: 'NY',
        postal_code: '123001',
        country_code: 'US'
    },
    name: 'Test Card 2',
    saved: true,
    default: false,
    state: CreditCardStateV1.Expired
};
let CREDIT_CARD3: CreditCardV1 = {
    id: '3',
    customer_id: '2',
    type: CreditCardTypeV1.Visa,
    number: '4032037578262780',
    expire_month: 5,
    expire_year: 2022,
    first_name: 'Steve',
    last_name: 'Jobs',
    billing_address: {
        line1: '234 6th Str',
        city: 'Los Angeles',
        state: 'CA',
        postal_code: '65320',
        country_code: 'US'
    },
    ccv: '124',
    name: 'Test Card 2',
    state: CreditCardStateV1.Ok
};

export class CreditCardsPersistenceFixture {
    private _persistence: ICreditCardsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateCreditCards(done) {
        async.series([
        // Create one credit card
            (callback) => {
                this._persistence.create(
                    null,
                    CREDIT_CARD1,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.first_name, CREDIT_CARD1.first_name);
                        assert.equal(creditCard.last_name, CREDIT_CARD1.last_name);
                        assert.equal(creditCard.expire_year, CREDIT_CARD1.expire_year);
                        assert.equal(creditCard.customer_id, CREDIT_CARD1.customer_id);

                        callback();
                    }
                );
            },
        // Create another credit card
            (callback) => {
                this._persistence.create(
                    null,
                    CREDIT_CARD2,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.first_name, CREDIT_CARD2.first_name);
                        assert.equal(creditCard.last_name, CREDIT_CARD2.last_name);
                        assert.equal(creditCard.expire_year, CREDIT_CARD2.expire_year);
                        assert.equal(creditCard.customer_id, CREDIT_CARD2.customer_id);

                        callback();
                    }
                );
            },
        // Create yet another credit card
            (callback) => {
                this._persistence.create(
                    null,
                    CREDIT_CARD3,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.first_name, CREDIT_CARD3.first_name);
                        assert.equal(creditCard.last_name, CREDIT_CARD3.last_name);
                        assert.equal(creditCard.expire_year, CREDIT_CARD3.expire_year);
                        assert.equal(creditCard.customer_id, CREDIT_CARD3.customer_id);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    testCrudOperations(done) {
        let creditCard1: CreditCardV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateCreditCards(callback);
            },
        // Get all credit cards
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        creditCard1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the credit card
            (callback) => {
                creditCard1.name = 'Updated Card 1';

                this._persistence.update(
                    null,
                    creditCard1,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isObject(creditCard);
                        assert.equal(creditCard.name, 'Updated Card 1');
                        // PayPal changes id on update
                        //!!assert.equal(creditCard.id, creditCard1.id);

                        creditCard1 = creditCard;

                        callback();
                    }
                );
            },
        // Delete credit card
            (callback) => {
                this._persistence.deleteById(
                    null,
                    creditCard1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete credit card
            (callback) => {
                this._persistence.getOneById(
                    null,
                    creditCard1.id,
                    (err, creditCard) => {
                        assert.isNull(err);

                        assert.isNull(creditCard || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create credit cards
            (callback) => {
                this.testCreateCreditCards(callback);
            },
        // Get credit cards filtered by customer id
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        customer_id: '1'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get credit cards by state
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        state: 'ok'
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        // PayPal calculate states by itself
                        //assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get credit cards by saved
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        saved: true
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Get credit cards by ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        ids: ['1', '3']
                    }),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        // PayPal manages ids by itself
                        //assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        ], done);
    }

}
