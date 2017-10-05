//var logger = require();

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

class Auth{
  constructor(token, tags){
    this.token = token;
    this.tags = tags;
  }

  query(){
    return 'SELECT * FROM srvUsers WHERE token=\'{}\''.format(this.token);
  }

  obtainAuthLvl(data){
    if (data.rol == "server"){
      return data.rol;
    }
    if (data.json.roles.indexOf(obtainAuthLvl("admin") != -1)){
      return "admin";
    }
    if (data.json.roles.indexOf(obtainAuthLvl("manager") != -1)){
      return "manager";
    }
    return "user";
  }

  checkAuthorization(r, type){
    if (!r.data.length){
      return {'success': false, 'status': 404, 'data': type+" does not exist."};
    }
    var exp = moment(r.data[0].tokenexp, 'YYYY-MM-DD HH:mm:ss Z');
    var now = moment();
    if (exp.isBefore(now) ){
      return {'success': false, 'status': 401, 'data': "Token expired."};
    }if (this.tags.indexOf(this.obtainAuthLvl(r.data[0])) == -1){
      return {'success': false, 'status': 401, 'data': "Unauthorized"};
    }
    return {'success': true, 'status': 200, 'data': "Ok"};
  }
}

class AuthServer extends Auth{

  constructor(token){
    super(token, ["server"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "server");
  }

}

class AuthAdmin extends Auth{

  constructor(token){
    super(token, ["admin"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

class AuthManager extends Auth{

  constructor(token){
    super(token, ["admin", "manager"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

class AuthUser extends Auth{

  constructor(token){
    super(token, ["manager", "admin", "user"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

class AuthUserServer extends Auth{

  constructor(token){
    super(token, ["manager", "admin", "user", "server"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

class AuthManagerServer extends Auth{

  constructor(token){
    super(token, ["manager", "admin", "server"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

class AuthAdminServer extends Auth{

  constructor(token){
    super(token, ["admin", "server"]);
  }

  obtainAuthLvl(data){
    return super.obtainAuthLvl(data);
  }

  query(){
    return super.query();
  }

  checkAuthorization(result){
    return super.checkAuthorization(result, "user");
  }
}

module.exports = {
    AuthUser : AuthUser,
    AuthAdmin : AuthAdmin,
    AuthManager : AuthManager,
    AuthServer : AuthServer,
    AuthUserServer : AuthUserServer,
    AuthManagerServer : AuthManagerServer,
    AuthAdminServer : AuthAdminServer
};
