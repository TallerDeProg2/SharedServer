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

describe('User\'s cars endpoints', function() {

  describe('GET user\'s car', function() {

    it('it should GET one car of the user with id = 03', function(done) {
      chai.request(server)
          .get('/users/03/cars')
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
          .get('/users/02/cars')
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
          .post('/users/04/cars')
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
          .post('/users/04/cars')
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
              .get('/users/04/cars')
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
          .post('/users/03/cars')
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

});
