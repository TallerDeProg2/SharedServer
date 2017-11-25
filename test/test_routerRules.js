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

  describe('RUN rules', function() {

    it('it should return cost 90 when running all the rules with distance 2 and time 2', function(done) {
      chai.request(server)
          .post('/rules/run')
          .set('content-type', 'application/json')
          .send({"fact": { "language": "string",
                           "blob":  {"distance" : 2,
                                    "time" : 2}
                          }})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.facts[0].cost.should.be.eql(90);
              done();
          });
    });

    it('it should return cost 80 when the distance is 2 and the rule to run is the 04', function(done) {
      chai.request(server)
          .post('/rules/04/run')
          .set('content-type', 'application/json')
          .send({"fact": { "language": "string",
                           "blob":  {"distance" : 2,
                                    "time" : 2}
                          }})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.facts[0].cost.should.be.eql(80);
              done();
          });
    });

    it('it should return status 404 when the rule id es invalid', function(done) {
      chai.request(server)
          .post('/rules/290830/run')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('GET rules', function() {

    it('it should GET all the rules', function(done) {
      chai.request(server)
          .get('/rules')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.rules.should.be.a('array');
              res.body.rules.length.should.be.eql(2);
            done();
          });
    });

    it('it should GET one rule with id = "04"', function(done) {
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

  describe('PUT rules', function() {

    it('it should get status 200 after updating a valid rule', function(done){
      chai.request(server)
          .put('/rules/04')
          .set('content-type', 'application/json')
          .send({"_ref" : "fghij",
                "message" : "new test commit",
                "blob" : "new body",
                "active" : false})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a server', function(done){
      chai.request(server)
      .get('/rules/04')
      .set('token', 'superusercito-token')
      .end(function(err, res) {
              var old_ref = res.body.rule._ref;
              chai.request(server)
                  .put('/rules/04')
                  .set('token', 'superusercito-token')
                  .send({"_ref" : old_ref,
                        "message" : "new new test commit",
                        "blob" : "new new body",
                        "active" : false})
                  .set('token', 'token')
                  .end(function(err, res) {
                      res.should.have.status(200);
                      chai.request(server)
                      .get('/rules/04')
                      .set('token', 'token')
                      .end(function(err, res) {
                          res.should.have.status(200);
                          res.body.rule.lastcommit.body.should.be.eql("new new body");
                          done();
                      });
                  });
          });
    });

    it('it should get status 404 when the server does not exist', function(done){
      chai.request(server)
          .put('/rules/12092808')
          .set('content-type', 'application/json')
          .send({"_ref" : "fghij",
                "message" : "test commit",
                "blob" : "new body",
                "active" : false})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .put('/rules/04')
          .set('content-type', 'application/json')
          .send({"_ref" : "fghij",
                "message" : "test commit"})
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

  });

  describe('GET rule\'s commits', function() {

    it('it should GET all the rule\'s commits', function(done) {
      chai.request(server)
          .get('/rules/04/commits')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.commits.should.be.a('array');
              res.body.commits.length.should.be.eql(3);
            done();
          });
    });

    it('it should return status 404 when the rule id es invalid', function(done) {
      chai.request(server)
          .get('/rules/90199809/commits')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should GET one rule commit with id = "fghij"', function(done) {
      chai.request(server)
          .get('/rules/04/commits/fghij')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.rule.lastcommit.message.should.be.eql("test commit");
            done();
          });
    });

    it('it should return status 404 when the commit id es invalid', function(done) {
      chai.request(server)
          .get('/rules/04/commits/01')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });



  describe('DELETE rules', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/rules/58798790')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/rules/04')
          .set('token', 'superusercito-token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });

  });
});
