var dataBase = require('./controllerDataBase.js');
var parser = require('./controllerParser.js');
//var logger = require();

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

//-------------------------->Aux common functions<---------------------//
function authToken(r, type){
  if (!r.data.length){
    return {'success': false, 'status': 404, 'data': type+" does not exist."};
  }
  var exp = moment(r.data[0].tokenexp, 'YYYY-MM-DD HH:mm:ss Z');
  var now = moment();
  if (exp.isBefore(now) ){
    return {'success': false, 'status': 401, 'data': "Token expired."};
  }
  return {'success': true, 'status': 200, 'data': "Ok"};
}

function queryUsers(token){
  return 'SELECT * FROM users WHERE token=\'{}\''.format(token);
}


//-----------------------------------------------------------------------//

class AuthServer{

  constructor(token){
    this.token = token;
  }

  query(){
    return 'SELECT * FROM servers WHERE token=\'{}\''.format(this.token);
  }

  checkAuthorization(result){
    return authToken(result, "server");
  }

}

class AuthAdmin{

  constructor(token){
    this.token = token;
  }

  query(){
    return queryUsers(this.token);
  }

  checkAuthorization(r){
    var userAuth = authToken(r, "user");
    if (!userAuth.success){
      return userAuth;
    }
    if (r.data[0].authLvl != "admin"){
      return {'success': false, 'status': 401, 'data': "Unauthorized"};
    }
    return {'success': true, 'status': 200, 'data': "Ok"};
  }
}

class AuthManager{

  constructor(token){
    this.token = token;
  }

  query(){
    return queryUsers(this.token);
  }

  checkAuthorization(r){
    var userAuth = authToken(r, "user");
    if (!userAuth.success){
      return userAuth;
    }
    if (!(r.data[0].authLvl == "admin" || r.data[0].authLvl == "manager")){
      return {'success': false, 'status': 401, 'data': "Unauthorized"};
    }
    return {'success': true, 'status': 200, 'data': "Ok"};
  }
}

class AuthUser{

  constructor(token){
    this.token = token;
  }

  query(){
    return queryUsers(this.token);
  }

  checkAuthorization(result){
    return authToken(result, "user");
  }
}

module.exports = {
    AuthUser : AuthUser,
    AuthAdmin : AuthAdmin,
    AuthManager : AuthManager,
    AuthServer : AuthServer
};
