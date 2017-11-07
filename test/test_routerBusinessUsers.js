var chai = require('chai');
var chaiHttp = require('chai-http');

var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');
var dataBase = require('../src/controllers/controllerData/controllerDataBase.js');

var logger = require('../src/srv/log.js');

describe('Business Users endpoints', function() {

  describe('GET Business Users', function() {

    it('it should GET all the business users', function(done) {
      chai.request(server)
          .get('/business-users')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.businessUsers.should.be.a('array');
              res.body.businessUsers.length.should.be.eql(1);
            done();
          });
    });

    it('it should GET one user with id = "usercito" when asking for Get/me', function(done) {
      chai.request(server)
          .get('/business-users/me')
          .set('token', 'token')
          .set('id','usercito')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.businessUser.username.should.be.eql("usercito");
            done();
          });
    });

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .get('/business-users/me')
          .set('token', 'token')
          .set('id', '00')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('POST business users', function() {

    it('it should get status 201 after creating a valid user', function(done){
      chai.request(server)
          .post('/business-users')
          .set('content-type', 'application/json')
          .send({"username": "string",
            "password": "string",
            "name": "string",
            "surname": "string",
            "roles": ["user"]
          })
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a user', function(done){
      chai.request(server)
          .post('/business-users')
          .set('content-type', 'application/json')
          .send({"username": "string2",
            "password": "string",
            "name": "string",
            "surname": "string",
            "roles": ["user"]
          })
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(201);
              chai.request(server)
              .get('/business-users')
              .set('token', 'token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.businessUsers.should.be.a('array');
                  res.body.businessUsers.length.should.be.eql(3);
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/business-users')
          .set('content-type', 'application/json')
          .send({"username": "string2",
            "password": "string",
          })
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

  });

  describe('PUT business users', function() {

    it('it should get status 200 after updating a valid user', function(done){
      chai.request(server)
          .put('/business-users/string')
          .set('content-type', 'application/json')
          .send({"username": "string",
            "password": "nuevaPass",
            "name": "string",
            "surname": "string",
            "roles": ["user"]
          })
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a user', function(done){
      chai.request(server)
          .put('/business-users/me')
          .set('content-type', 'application/json')
          .send({"username": "usercito",
            "password": "nuevaPass",
            "name": "string",
            "surname": "string",
            "roles": ["admin"]
          })
          .set('id', 'usercito')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              chai.request(server)
              .get('/business-users/me')
              .set('id','usercito')
              .set('token', 'token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.businessUser.password.should.be.eql("nuevaPass");
                  done();
              });
          });

        it('it should get status 400 when one of the parameters is missing', function(done){
          chai.request(server)
              .put('/business-users/string')
              .set('content-type', 'application/json')
              .send({"username": "string",
                "password": "nuevaPass",
                "name": "string",
              })
              .set('token', 'token')
              .end(function(err, res) {
                  res.should.have.status(400);
                  done();
              });
        });
    });

    it('it should get status 404 when the user does not exist', function(done){
      chai.request(server)
          .put('/business-users/768768')
          .set('content-type', 'application/json')
          .send({"username": "768768",
            "password": "nuevaPass",
            "name": "string",
            "surname": "string",
            "roles": ["user"]
          })
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .put('/business-users/me')
          .set('content-type', 'application/json')
          .send({"username": "usercito",
            "password": "string",
          })
          .set('id','usercito')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

  });

  describe('DELETE business users', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/business-users/58798790')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/business-users/string2')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });
  });
});
