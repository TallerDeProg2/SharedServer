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

describe('Users endpoints', function() {

  describe('GET users', function() {

    it('it should GET all the users', function(done) {
      chai.request(server)
          .get('/users')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.users.should.be.a('array');
              res.body.users.length.should.be.eql(1);
            done();
          });
    });

    it('it should GET one user with id = "02"', function(done) {
      chai.request(server)
          .get('/users/02')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              logger.info("Mi body esss: "+JSON.stringify(res.body));
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
            "firstName": "string",
            "lastName": "string",
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
            "firstName": "string2",
            "lastName": "string2",
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
  });

});
