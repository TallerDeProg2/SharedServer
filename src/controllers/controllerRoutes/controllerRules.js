var dataBase = require('../controllerData/controllerDataBase.js');
var parser = require('../controllerData/controllerParserRules.js');

var controllerToken = require('../controllerLogic/controllerToken.js');
var controllerId = require('../controllerLogic/controllerId.js');
var controllerRef = require('../controllerLogic/controllerRef.js');

var controllerAuth = require('../controllerLogic/controllerAuthorization.js');

var logger = require('../../srv/log.js');

var serialize = require('serialize-javascript');
var deserialize = str => eval('(' + str + ')');

var RuleEngine = require('node-rules');

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

  if (!request.body.blob || !request.body.message){
    return parser.parserPutRule({'success': false, 'status': 400, 'data_retrieved': "Atribute missing"}, response);
  }

  var new_commit = {'_ref' : _ref, 'message' : request.body.message,
                          'body' : request.body.blob,
                          'timestamp' : now_fr};

  var active = request.body.active;
  var q = 'UPDATE rules SET _ref=\'{}\', commits=jsonb_insert(commits, \'{}\', \'{}\'), active=\'{}\' WHERE id=\'{}\' AND _ref=\'{}\' RETURNING *;'.format(_ref, '{commits, 0}', JSON.stringify(new_commit), active, ruleId, old_ref);

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
  var auth = new controllerAuth.AuthManager(tk);
  var q = 'SELECT commits FROM rules WHERE id=\'{}\';'.format(ruleId);
  dataBase.query(q, response, parser.parserGetRuleCommits, auth);
}

function getRuleCommit(ruleId, commitId, request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthManager(tk);
  var q = 'SELECT * FROM rules WHERE id=\'{}\';'.format(ruleId);
  dataBase.query(q, response, parser.parserGetRuleCommit, auth, commitId);
}

function runRules(request, response) {
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules;';
  return _runRules(q, request, response, parser.parserRunRules, auth);
}

function runRule(ruleId, request, response) {
  logger.info("Entro a runRule");
  var tk = request.headers.token;
  var auth = new controllerAuth.AuthUser(tk);
  var q = 'SELECT * FROM rules WHERE id=\'{}\';'.format(ruleId);
  return _runRules(q, request, response, parser.parserRunRule, auth);
}


function _runRules(query, request, response, parser, auth){
  logger.info("Entro a _runRules");
  var resolve_auth = dataBase.promise_query_get(auth.query());
  resolve_auth.then(function (result) {
      logger.info("Estoy en el thennn");
      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result});
      if (!result_auth.success){
        logger.info("Fallo la auth wachiin");
        return parser(result_auth, response);
      }
      logger.info("Ya autoriceee");
      dataBase.promise_query_get(query)
        .then(function(rules){
                logger.info("Por resolver, mis rules son: "+rules);
                resolveRules(request.fact, rules, parser, response);
              })
        .catch(parser({'success': false, 'status': 500, 'data_retrieved': "Unexpected error (could not run rules)"}, response));
    }).catch(function(err, done) {
      return parser({'success': false, 'status': 500, 'data_retrieved': "Unexpected error "+err}, response);
    });
    return resolve_auth;
}

function resolveRules(fact, rules, parser, response){
  logger.info("Resolviendo! Mis rules son: "+rules);
  if (!rules.length){
    logger.info("No hay rules");
    return parser({'success': false, 'status': 404, 'data_retrieved': "Rules not found"}, response);
  }
  rules = rules.map(rule => deserialize(rule.blob));
  logger.info("Ya hice el map");
  fact = deserialize(fact);
  var R = new RuleEngine(rules, { ignoreFactChanges: true });
  R.execute(fact,function(result){
    return parser({'success': true, 'status': 200, 'data_retrieved': [serialize(result)]}, response);
  });
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
