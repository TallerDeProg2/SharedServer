var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

describe('Users endpoints', function() {

  describe('GET users', function() {

    it('it should GET all the users', function(done) {
      chai.request(server)
          .get('/users')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.users.should.be.a('array');
              res.body.users.length.should.be.eql(3);
            done();
          });
    });

    it('it should GET one user with id = "02"', function(done) {
      chai.request(server)
          .get('/users/02')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.user.username.should.be.eql("usercitoapp");
            done();
          });
    });

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .get('/users/3049239')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('POST users', function() {

    it('it should get status 201 after creating a valid user', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users')
          .set('content-type', 'application/json')
          .send({
            "_ref": "string",
            "type": "string",
            "username": "string",
            "password": "string",
            "fb": {
              "userId": "string",
              "authToken": "string"
            },
            "firstname": "string",
            "lastname": "string",
            "country": "string",
            "email": "string",
            "birthdate": now_fr,
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a user', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users')
          .set('content-type', 'application/json')
          .send({
            "_ref": "string2",
            "type": "string2",
            "username": "string2",
            "password": "string2",
            "fb": {
              "userId": "string2",
              "authToken": "string2"
            },
            "firstname": "string2",
            "lastname": "string2",
            "country": "string2",
            "email": "string2",
            "birthdate": now_fr,
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              var id = res.body.user.id;
              chai.request(server)
              .get('/users/'+id)
              .set('token', 'superservercito-token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.user.username.should.be.eql("string2");
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/users')
          .set('content-type', 'application/json')
          .send({
            "_ref": "string2",
            "type": "string2",
            "username": "string2"
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

    it('it should get status 200 after validating a user (password)', function(done){
      chai.request(server)
          .post('/users/validate')
          .set('content-type', 'application/json')
          .send({
            "username": "usercitoapp",
            "password": "pass",
            "facebookauthtoken": ""
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should get status 200 after validating a user (facebookToken)', function(done){
      chai.request(server)
          .post('/users/validate')
          .set('content-type', 'application/json')
          .send({
            "username": "usercito@app.com",
            "password": "",
            "facebookauthtoken": "1234"
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing (POST validate)', function(done){
      chai.request(server)
          .post('/users/validate')
          .set('content-type', 'application/json')
          .send({
            "username": "usercitoapp"
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

    it('it should get status 400 when the validation fails', function(done){
      chai.request(server)
          .post('/users/validate')
          .set('content-type', 'application/json')
          .send({
            "username": "usercitoapp",
            "password": "wrongPass",
            "facebookauthtoken": ""
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

  });

  describe('PUT users', function() {

    it('it should get status 200 after updating a valid user', function(done){
      chai.request(server)
          .put('/users/02')
          .set('content-type', 'application/json')
          .send({
            "_ref": "defgh",
            "type": "passenger",
            "username": "usercitoapp",
            "password": "passNueva",
            "fb": {
              "userId": "usercito@app.com",
              "authToken": "1234"
            },
            "firstname": "usercito",
            "lastname": "app",
            "country": "applandia",
            "email": "usercito@app.com",
            "birthdate": 0,
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a user', function(done){
      chai.request(server)
      .get('/users/02')
      .set('token', 'superservercito-token')
      .end(function(err, res) {
              var old_ref = res.body.user._ref;

              chai.request(server)
                  .put('/users/02')
                  .set('content-type', 'application/json')
                  .send({
                    "_ref": old_ref,
                    "type": "passenger",
                    "username": "usercitoapp",
                    "password": "passNueva",
                    "fb": {
                      "userId": "usercito@app.com",
                      "authToken": "1234"
                    },
                    "firstname": "usercita",
                    "lastname": "app",
                    "country": "applandia",
                    "email": "usercito@app.com",
                    "birthdate": 0,
                  })
                  .set('token', 'superservercito-token')
                  .end(function(err, res) {
                      res.should.have.status(200);
                      chai.request(server)
                      .get('/users/02')
                      .set('token', 'superservercito-token')
                      .end(function(err, res) {
                          res.should.have.status(200);
                          res.body.user.firstname.should.be.eql("usercita");
                          done();
                      });
                  });
          });
    });

    it('it should get status 404 when the user does not exist', function(done){
      chai.request(server)
          .put('/users/768768')
          .set('content-type', 'application/json')
          .send({
            "_ref": "hkjhkh",
            "type": "passenger",
            "username": "usercitoapp",
            "password": "passNueva",
            "fb": {
              "userId": "usercito@app.com",
              "authToken": "1234"
            },
            "firstname": "usercito",
            "lastname": "app",
            "country": "applandia",
            "email": "usercito_2017@app.com",
            "birthdate": 0,
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .put('/users/02')
          .set('token', 'superservercito-token')
          .send({
            "_ref": "jhkh",
            "type": "passenger",
            "username": "usercitoapp"
          })
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });
  });

  describe('DELETE users', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/users/58798790')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/users/02')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });

  });

});
