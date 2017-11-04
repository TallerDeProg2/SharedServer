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
          .set({'token':"token"})
          .end(function(err, res) {
              res.should.have.status(200);
              res.body.businessUsers.should.be.a('array');
              res.body.businessUsers.length.should.be.eql(1);
            done();
          });
    });

  });

});
