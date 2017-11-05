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

describe('Servers endpoints', function() {

  describe('GET servers', function() {

    it('it should GET all the servers', function(done) {
      chai.request(server)
          .get('/servers')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.servers.should.be.a('array');
              res.body.servers.length.should.be.eql(1);
            done();
          });
    });

    it('it should GET one server with id = "0"', function(done) {
      chai.request(server)
          .get('/servers/00')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.server.name.should.be.eql("servercito");
            done();
          });
    });

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .get('/servers/1')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('POST servers', function() {

    it('it should get status 201 after creating a valid server', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/servers')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
            "createdBy": "string",
            "createdTime": now_fr,
            "name": "string",
            "lastConnection": now_fr})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a server', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/servers')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
            "createdBy": "string",
            "createdTime": now_fr,
            "name": "string2",
            "lastConnection": now_fr})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(201);
              var id = res.body.server.server.id;
              chai.request(server)
              .get('/servers/'+id)
              .set('token', 'token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.server.name.should.be.eql("string2");
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/servers')
          .set('content-type', 'application/json')
          .send({"id": "string", "_ref": "string",
            "createdBy": "string"})
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

    it('it should update the server token', function(done){
      chai.request(server)
          .post('/servers/00')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(201);
              res.body.server.token.should.not.be.eql("servercito-token");
              done();
          });
    });

    it('it should return status 404 when the server does not exist (postToken)', function(done){
      chai.request(server)
          .post('/servers/58798790')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });


  });

  describe('PUT servers', function() {

    it('it should get status 200 after updating a valid server', function(done){
      chai.request(server)
          .put('/servers/00')
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
          .put('/servers/00')
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
              .get('/servers/00')
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
          .put('/servers/768768')
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

    it('it should get status 400 when one of the parameters is not correct', function(){

    });

  });

  describe('DELETE servers', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/servers/58798790')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/servers/00')
          .set('token', 'token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });

  });
});
