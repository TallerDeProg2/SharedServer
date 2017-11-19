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

  var ref_first_commit = "";

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

  describe('POST rules', function() {

    it('it should get status 201 after creating a valid rule', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/rules')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
          "message" : "I am a commit", "blob" : "body wannabe",
          "active" : false})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a rule', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/rules')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
          "message" : "I am another commit", "blob" : "body wannabe",
          "active" : false})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              var id = res.body.rule.id;
              var ref_first_commit = res.body.rule._ref;
              chai.request(server)
              .get('/rules/'+id)
              .set('token', 'superusercito-token')
              .end(function(err, res) {
                  logger.info("BODY POST: "+JSON.stringify(res.body));
                  res.should.have.status(200);
                  res.body.rule.lastcommit.message.should.be.eql("I am another commit");
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/servers')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
          "message" : "I am a commit"})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

  });

});
