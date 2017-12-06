var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

describe('User\'s cards endpoints', function() {

  describe('GET user\'s card', function() {

    it('it should GET one card of the user with id = 1', function(done) {
      chai.request(server)
          .get('/users/1/card')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.card.ccvv.should.be.eql("123");
            done();
          });
    });

    it('it should return status 404 when the id is invalid', function(done) {
      chai.request(server)
          .get('/users/3049239/card')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

  });

  describe('POST users', function() {

    it('it should get status 201 after creating a valid card', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users/2/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "123",
            "expiration_month": "12",
            "expiration_year": "19",
            "method": "card",
            "number": "1111222233334444",
            "type": "visa"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              done();
          });
    });

    it('it should POST a card', function(done){
      var now = moment();
      var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

      chai.request(server)
          .post('/users/3/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "777",
            "expiration_month": "11",
            "expiration_year": "18",
            "method": "card",
            "number": "1111222233334444",
            "type": "mastercard"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(201);
              chai.request(server)
              .get('/users/3/card')
              .set('token', 'superservercito-token')
              .end(function(err, res) {
                  res.should.have.status(200);
                  res.body.card.ccvv.should.be.eql("777");
                  res.body.card.type.should.be.eql("mastercard");
                  done();
              });
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .post('/users/3/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "777",
            "expiration_month": "11",
            "expiration_year": "18"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });

    it('it should get status 404 when the id doesn\'t exist', function(done){
      chai.request(server)
          .post('/users/29830832/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "777",
            "expiration_month": "11",
            "expiration_year": "18",
            "method": "card",
            "number": "1111222233334444",
            "type": "mastercard"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });
  });

  describe('PUT user\'s card', function() {

    it('it should get status 200 after updating a valid card', function(done){
      chai.request(server)
          .put('/users/1/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "123",
            "expiration_month": "12",
            "expiration_year": "20",
            "method": "card",
            "number": "1111222233334444",
            "type": "visa"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              done();
          });
    });

    it('it should PUT a card', function(done){
      chai.request(server)
      .get('/users/2/card')
      .set('token', 'superservercito-token')
      .end(function(err, res) {
              chai.request(server)
                  .put('/users/2/card')
                  .set('content-type', 'application/json')
                  .send({"ccvv": "123",
                    "expiration_month": "10",
                    "expiration_year": "25",
                    "method": "card",
                    "number": "1111222233334444",
                    "type": "visa"})
                  .set('token', 'superservercito-token')
                  .end(function(err, res) {
                      res.should.have.status(200);
                      chai.request(server)
                      .get('/users/2/card')
                      .set('token', 'superservercito-token')
                      .end(function(err, res) {
                          res.should.have.status(200);
                          res.body.card.expiration_year.should.be.eql("25");
                          res.body.card.expiration_month.should.be.eql("10");
                          done();
                      });
                  });
          });
    });

    it('it should get status 404 when the user does not exist', function(done){
      chai.request(server)
          .put('/users/9189028/card')
          .set('content-type', 'application/json')
          .send({"ccvv": "123",
            "expiration_month": "10",
            "expiration_year": "25",
            "method": "card",
            "number": "1111222233334444",
            "type": "visa"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should get status 400 when one of the parameters is missing', function(done){
      chai.request(server)
          .put('/users/2/card')
          .set('token', 'superservercito-token')
          .send({"ccvv": "123",
            "expiration_month": "10",
            "expiration_year": "25"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(400);
              done();
          });
    });
  });

  describe('DELETE user\'s card', function() {

    it('it should return status 404 when the id es invalid', function(done) {
      chai.request(server)
          .delete('/users/58798790/card')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(404);
              done();
          });
    });

    it('it should return status 204 when the id es valid', function(done) {
      chai.request(server)
          .delete('/users/1/card')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(204);
              done();
          });
    });

  });

});
