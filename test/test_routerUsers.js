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
});
