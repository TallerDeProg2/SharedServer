var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

describe('Paymethods endpoints', function() {

  describe('GET user\'s transactions', function() {

    it('it should GET all the user\'s transactions', function(done) {
      chai.request(server)
          .get('/users/2/transactions')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.transactions.should.be.a('array');
              res.body.transactions.length.should.be.eql(1);
              done();
          });
    });

  });

  describe('GET paymethods', function() {

    it('it should GET all the paymethods', function(done) {
      chai.request(server)
          .get('/paymethods')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
            res.should.have.status(200);
            res.body.paymethods.should.be.a('array');
            res.body.paymethods.length.should.not.be.eql(0);
            done();
          });
    });

  });

  describe('POST transactions', function() {

    it('it should make a transaction', function(done) {
      chai.request(server)
          .post('/users/1/transactions')
          .set('content-type', 'application/json')
          .send({"trip" : 1,
                 "payment": { "value" : 20,
                              "transaction_id" : "0c2f0554-a29f-4a4a-8ce5-adce6f2d7508",
                              "currency" : "ARS",
                              "paymethod" :{
                                    "ccvv": "123",
                                    "expiration_month": "12",
                                    "expiration_year": "19",
                                    "method": "card",
                                    "number": "1111222233334444",
                                    "type": "visa"
                              }
                            }
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
            res.should.have.status(200);
            done();
          });
    });

  });


});
