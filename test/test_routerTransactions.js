var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var logger = '../src/srv/log.js'

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
            //logger.info("METODOS DE PAGOO: "+JSON.stringify(res.body));
            done();
          });
    });

  });


});
