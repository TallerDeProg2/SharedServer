/** @module controllerAuthorization */

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

/**
 * @class
 * Generic Auth object
 */
class Auth{
  constructor(token, tags){
    this.token = token;
    this.tags = tags;
  }

  /**
   * @returns the query that the Auth object must do.
   */
  query(){
    return 'SELECT * FROM srvusers WHERE token=\'{}\';'.format(this.token);
  }

  /**
   * @param {json} data the data_retrieved from the query().
   * @returns the maximum level of checkAuthorization that the user that bears the token has.
   * @inner
   */
  obtainAuthLvl(data){
    if (data.rol == "server"){
      return data.rol;
    }
    if (data.data.roles.indexOf("admin") != -1){
      return "admin";
    }
    if (data.data.roles.indexOf("manager") != -1){
      return "manager";
    }
    return "user";
  }

  /**
   * @param {json} r the data_retrieved from the query().
   * @param {string} type the type of the token bearer.
   * @returns a json object that contains the status of the authentication (success, status, data_retrieved)
   */
  checkAuthorization(r, type){
    if (!r.data_retrieved.length){
      return {'success': false, 'status': 403, 'data_retrieved': type+" does not exist. Authentication failed."};
    }
    var exp = moment(r.data_retrieved[0].tokenexp, 'YYYY-MM-DD HH:mm:ss Z');
    var now = moment();
    if (exp.isBefore(now) ){
      return {'success': false, 'status': 401, 'data_retrieved': "Token expired. Authentication failed."};
    }if (this.tags.indexOf(this.obtainAuthLvl(r.data_retrieved[0])) == -1){
      return {'success': false, 'status': 401, 'data_retrieved': "Unauthorized. Authentication failed."};
    }
    return {'success': true, 'status': 200, 'data_retrieved': "Ok"};
  }
}

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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

/**
 * @class
 * @extends Auth
 */
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
