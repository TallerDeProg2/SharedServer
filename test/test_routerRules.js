var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

var logger = require('../src/srv/log.js');

describe('Rules endpoints', function() {

  describe('GET rules', function() {

    it('it should GET all the rules', function(done) {
      chai.request(server)
          .get('/rules')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.rules.should.be.a('array');
              res.body.rules.length.should.be.eql(1);
            done();
          });
    });

    it('it should GET one rule with id = "0"', function(done) {
      chai.request(server)
          .get('/rules/04')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.rule._ref.should.be.eql("fghij");
            done();
          });
    });

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .get('/rules/90199809')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });
});
