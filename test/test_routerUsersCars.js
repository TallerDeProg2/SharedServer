var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

describe('User\'s cars endpoints', function() {

  describe('GET user\'s car', function() {

    it('it should GET one car of the user with id = 03', function(done) {
      chai.request(server)
          .get('/users/2/cars')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.car.brand.should.be.eql("brand");
            done();
          });
    });

    it('it should return status 404 when the id is invalid', function(done) {
      chai.request(server)
          .get('/users/3049239/cars')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 404 when the id is from a passenger', function(done) {
      chai.request(server)
          .get('/users/1/cars')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('POST users', function() {

    it('it should get status 201 after creating a valid car', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users/3/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brand",
            "model": "model",
            "color": "color",
            "plate": "plate",
            "year": "year",
            "status": "status",
            "radio": "radio",
            "airconditioner": true,
            "_ref": "abcde"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a car', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users/3/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brand",
            "model": "model",
            "color": "color",
            "plate": "plate",
            "year": "year",
            "status": "status",
            "radio": "radio",
            "airconditioner": true,
            "_ref": "abcde"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              chai.request(server)
              .get('/users/3/cars')
              .set('token', 'superservercito-token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.car.brand.should.be.eql("brand");
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/users/3/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brand",
            "model": "model",
            "color": "color"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

    it('it should get status 404 when the id doesn\'t exist', function(done){
      chai.request(server)
          .post('/users/29830832/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brand",
            "model": "model",
            "color": "color",
            "plate": "plate",
            "year": "year",
            "status": "status",
            "radio": "radio",
            "airconditioner": true,
            "_ref": "abcde"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });
  });

  describe('PUT user\'s cars', function() {

    it('it should get status 200 after updating a valid car', function(done){
      chai.request(server)
          .put('/users/2/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brandNew",
            "model": "modelNew",
            "color": "colorNew",
            "plate": "plateNew",
            "year": "yearNew",
            "status": "statusNew",
            "radio": "radioNew",
            "airconditioner": false,
            "_ref": "abcde"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a car', function(done){
      chai.request(server)
      .get('/users/2/cars')
      .set('token', 'superservercito-token')
      .end(function(err, res) {
              var old_ref = res.body.car._ref;
              chai.request(server)
                  .put('/users/2/cars')
                  .set('content-type', 'application/json')
                  .send({"brand": "tesla",
                    "model": "1234",
                    "color": "black",
                    "plate": "plateNew",
                    "year": "yearNew",
                    "status": "statusNew",
                    "radio": "radioNew",
                    "airconditioner": true,
                    "_ref": old_ref})
                  .set('token', 'superservercito-token')
                  .end(function(err, res) {
                      res.should.have.status(200);
                      chai.request(server)
                      .get('/users/2/cars')
                      .set('token', 'superservercito-token')
                      .end(function(err, res) {
                          res.should.have.status(200);
                          res.body.car.brand.should.be.eql("tesla");
                          res.body.car.color.should.be.eql("black");
                          done();
                      });
                  });
          });
    });

    it('it should get status 404 when the user does not exist', function(done){
      chai.request(server)
          .put('/users/9189028/cars')
          .set('content-type', 'application/json')
          .send({"brand": "brand",
            "model": "model",
            "color": "color",
            "plate": "plate",
            "year": "year",
            "status": "status",
            "radio": "radio",
            "airconditioner": true,
            "_ref": "abcde"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .put('/users/2/cars')
          .set('token', 'superservercito-token')
          .send({"brand": "brand",
            "model": "model",
            "color": "color"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });
  });

  describe('DELETE user\'s car', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/users/58798790/cars')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/users/2/cars')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });

  });

});
