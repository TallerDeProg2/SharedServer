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

    it('it should GET one server with id = "01" when asking for Get/me', function(done) {
      chai.request(server)
          .get('/business-users/me')
          .set('token', 'token')
          .set('id','01')
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

  describe('POST servers', function() {

    it('it should get status 201 after creating a valid server', function(done){
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

    it('it should POST a server', function(done){
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

  /*describe('PUT servers', function() {

    it('it should get status 200 after updating a valid server', function(done){
      chai.request(server)
          .put('/business-users/0')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
            "createdBy": "string",
            "createdTime": 0,
            "name": "string",
            "lastConnection": 0})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a server', function(done){
      chai.request(server)
          .put('/business-users/0')
          .set('content-type', 'application/json')
          .send({"id": "0", "_ref": "string",
            "createdBy": "string",
            "createdTime": 0,
            "name": "nuevoNombre",
            "lastConnection": 0})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              chai.request(server)
              .get('/business-users/0')
              .set('token', 'token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.server.name.should.be.eql("nuevoNombre");
                  done();
              });
          });
    });

    it('it should get status 404 when the server does not exist', function(done){
      chai.request(server)
          .put('/business-users/5')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
            "createdBy": "string",
            "createdTime": 0,
            "name": "string",
            "lastConnection": 0})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('DELETE servers', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/business-users/58798790')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    /*it('it should return status 200 when the id es valid', function(done) {
      chai.request(server)
          .delete('/business-users/0')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });
    });*/
});
