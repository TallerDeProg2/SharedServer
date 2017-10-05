var assert = require('assert');
var controller = require('../src/controllers/controllerLogic/controllerAuthorization.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

describe('controllerAuthorization - AuthServer', function() {

  it('returns "SELECT * FROM srvUsers WHERE token=token" when asked for query', function() {
    var auth = new controller.AuthServer("token");
    var q = auth.query();
    assert.equal(q, 'SELECT * FROM srvUsers WHERE token=\'token\'');
  });

  it('returns status 404 if there is no data (server)', function() {
    var auth = new controller.AuthServer("token");
    var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[]});
    assert.equal(js.status, 404);
  });

  it('returns status 401 if the token is expired (server)', function() {
    var now = moment();
    var expired = moment(now).subtract(1, 'day');
    var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

    var auth = new controller.AuthServer("token");
    var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'server', 'tokenexp': expired_fr}]});
    assert.equal(js.status, 401);
  });

  it('returns status 200 if the token is valid (server)', function() {
    var now = moment();
    var expired = moment(now).add(1, 'day');
    var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

    var auth = new controller.AuthServer("token");
    var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'server', 'tokenexp': expired_fr}]});
    assert.equal(js.status, 200);
  });

});

describe('controllerAuthorization - AuthUser', function() {

    it('returns "SELECT * FROM srvUsers WHERE token=token" when asked for query', function() {
      var auth = new controller.AuthUser("token");
      var q = auth.query();
      assert.equal(q, 'SELECT * FROM srvUsers WHERE token=\'token\'');
    });

    it('returns status 404 if there is no data (user)', function() {
      var auth = new controller.AuthUser("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[]});
      assert.equal(js.status, 404);
    });

    it('returns status 401 if the token is expired (user)', function() {
      var now = moment();
      var expired = moment(now).subtract(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthUser("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 200 if the token is valid (user)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthUser("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user']}}]});
      assert.equal(js.status, 200);
    });

});

describe('controllerAuthorization - AuthManager', function() {

    it('returns "SELECT * FROM srvUsers WHERE token=token" when asked for query', function() {
      var auth = new controller.AuthManager("token");
      var q = auth.query();
      assert.equal(q, 'SELECT * FROM srvUsers WHERE token=\'token\'');
    });

    it('returns status 404 if there is no data (manager)', function() {
      var auth = new controller.AuthManager("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[]});
      assert.equal(js.status, 404);
    });

    it('returns status 401 if the token is expired (manager)', function() {
      var now = moment();
      var expired = moment(now).subtract(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthManager("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 401 if the token is valid and the user is not a manager or an admin (manager)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthManager("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 200 if the token is valid and the user is a manager (manager)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthManager("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager']}}]});
      assert.equal(js.status, 200);
    });

    it('returns status 200 if the token is valid and the user is an admin (manager)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthManager("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager']}}]});
      assert.equal(js.status, 200);
    });

});

describe('controllerAuthorization - AuthAdmin', function() {

    it('returns "SELECT * FROM srvUsers WHERE token=token" when asked for query', function() {
      var auth = new controller.AuthAdmin("token");
      var q = auth.query();
      assert.equal(q, 'SELECT * FROM srvUsers WHERE token=\'token\'');
    });

    it('returns status 404 if there is no data (admin)', function() {
      var auth = new controller.AuthAdmin("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[]});
      assert.equal(js.status, 404);
    });

    it('returns status 401 if the token is expired (admin)', function() {
      var now = moment();
      var expired = moment(now).subtract(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthAdmin("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager', 'admin']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 401 if the token is valid and the user is a user (admin)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthAdmin("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 401 if the token is valid and the user is a manager (admin)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthAdmin("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager']}}]});
      assert.equal(js.status, 401);
    });

    it('returns status 200 if the token is valid and the user is an admin (admin)', function() {
      var now = moment();
      var expired = moment(now).add(1, 'day');
      var expired_fr = expired.format('YYYY-MM-DD HH:mm:ss Z');

      var auth = new controller.AuthAdmin("token");
      var js = auth.checkAuthorization({'success': true, 'status': 200, 'data':[{'rol': 'user', 'tokenexp': expired_fr, 'json' : {'roles': ['user', 'manager', 'admin']}}]});
      assert.equal(js.status, 200);
    });

});
