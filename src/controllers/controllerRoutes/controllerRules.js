var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserRules.js');

var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');

var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var moment = require('moment');
var format = require('string-format');
format.extend(String.prototype);

function getRules(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules;';
  dataBase.query(q, response, parser.parserGetRules, auth);
}

function getRule(ruleId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules where id=\'{}\';'.format(ruleId);
  dataBase.query(q, response, parser.parserGetRule, auth);
}

function postRule(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var id = controllerId.createId();
  var _ref = controllerRef.createRef(id);

  var now = moment();
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

  var commits = {'commits' : [{'_ref' : _ref, 'message' : request.body.message,
                          'body' : request.body.blob,
                          'timestamp' : now_fr}]};

  var active = request.body.active;

  if (!request.body.blob || !request.body.message){
    return parser.parserPostRules({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var q = 'INSERT INTO rules(id, _ref, commits, active) values(\'{}\', \'{}\', \'{}\', \'{}\') RETURNING *;'.format(id, _ref, JSON.stringify(commits), active);
  dataBase.query(q, response, parser.parserPostRule, auth);
}

function putRule(ruleId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);
  var old_ref = request.body._ref;

  var _ref = controllerRef.createRef(ruleId);
  var now = moment();
  var now_fr = now.format('YYYY-MM-DD HH:mm:ss Z');

  var new_commit = {'_ref' : _ref, 'message' : request.body.message,
                          'body' : request.body.blob,
                          'timestamp' : now_fr};

  var active = request.body.active;
  var q = 'UPDATE rules SET _ref=\'{}\', commits=jsonb_insert(commits, \'{}\', \'\"{}\"\'), active=\'{}\' where WHERE id=\'{}\' AND _ref=\'{}\' RETURNING *;'.format(_ref, '{commits, 0}', JSON.stringify(commit));

  dataBase.query(q, response, parser.parserPutRule, auth);
}

function deleteRule(ruleId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);

  var q = 'DELETE FROM rules WHERE id=\'{}\' RETURNING *;'.format(ruleId);
  dataBase.query(q, response, parser.parserDeleteRule, auth);
}

function getRuleCommits(ruleId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT commits FROM rules WHERE id=\'{}\';'.format(ruleId);
  dataBase.query(q, response, parser.parserGetRuleCommits, auth);
}

function getRuleCommit(ruleId, commitId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT commits FROM rules WHERE id=\'{}\';'.format(ruleId);
  dataBase.query(q, response, parser.parserGetRuleCommit, auth);
}

function runRules(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules;';
  return _runRules(q, request, response, parser.parserRunRules, auth);
}

function runRule(ruleId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules WHERE id=\'{}\';'.format(ruleId);
  return _runRules(q, request, response, parser.parserRunRule, auth);
}


function _runRules(query, request, response, parser, auth){
  /*var resolve_auth = promise_query_get(auth.query());
  resolve_auth.then(function (result) {
      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result.rows});
      if (!result_auth.success){
        return parser(result_auth, response);
      }
      promise_query_get(query).then(/*RUN RULES).cath(/*SHOW ERROR);
    )
    .catch(function (err) {
      return next(err);
    });*/
}

module.exports = {
  getRules : getRules,
  getRule : getRule,
  postRule : postRule,
  putRule : putRule,
  deleteRule : deleteRule,
  getRuleCommits : getRuleCommits,
  getRuleCommit : getRuleCommit,
  runRules : runRules,
  runRule : runRule
};
