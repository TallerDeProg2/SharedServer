var chai = require('chai');
var chaiHttp = require('chai-http');

var assert = require('assert');
var should = chai.should();
chai.use(chaiHttp);

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

var server = require('../src/srv/index.js');

describe('Trips endpoints', function() {

  describe('GET trips', function() {

    it('it should GET all the driver\'s (id = "03") trips', function(done) {
      chai.request(server)
          .get('/users/03/trips')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.trips.should.be.a('array');
              res.body.trips.length.should.be.eql(1);
            done();
          });
    });

    it('it should GET all the passenger\'s (id = "02") trips', function(done) {
      chai.request(server)
          .get('/users/02/trips')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.trips.should.be.a('array');
              res.body.trips.length.should.be.eql(2);
            done();
          });
    });

    it('it should GET one trip with id = 01', function(done) {
      chai.request(server)
          .get('/trips/01')
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.trip.driver.should.be.eql('03');
              res.body.trip.passenger.should.be.eql('02');
            done();
          });
    });

  });

  describe('POST trips', function() {

    it('it should return cost 90 when given distance 2 and time 2 (POST trip/estimate)', function(done) {
      chai.request(server)
          .post('/trips/estimate')
          .set('content-type', 'application/json')
          .send({"distance" : 2,
                 "traveltime" : 2,
                 "paymethod" : "cash",
                 "day" : "wednesday",
                 "travelhour" : "15:30"})
          .set('token', 'superservercito-token')
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.cost.value.should.be.eql(90);
              done();
          });
    });

  });

});
