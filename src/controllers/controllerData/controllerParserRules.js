var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function rdata(data) {
  var rules = [];
  for (var i = 0; i < data.length; i++) {
    rules[i] = {'id' : data[i].id,
                '_ref' : data[i]._ref,
                'lastcommit' : data[i].commits.commits[0],
                'active' : data[i].active};
  }
  return rules;
}

function parserGetRules(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "rules", data, 200);
}

function parserGetRule(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "rule", data, 200);
}

function parserPostRule(r, response) {
  var data = r.data_retrieved;
  if (r.success){
    data = rdata(data)[0];
  }
  else{
    return basicParser.reducedParser(r, response);
  }
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  return basicParser.extendedParser(r, response, "rule", data, 201);
}

function parserPutRule(r, response) {
  return parserGetRule(r, response);
}

function parserDeleteRule(r, response) {
  return basicParser.deleteParser(r, response);
}

function parserGetRuleCommits(r, response) {
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
    var data = r.data_retrieved;
  }else{
    var data = r.data_retrieved[0].commits.commits;
  }
  return basicParser.extendedParser(r, response, "commits", data, 200);
}

function parserGetRuleCommit(r, response, commitId){
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
    var data = r.data_retrieved;
  }else{
    var commit = obtainCommit(r.data_retrieved[0].commits.commits, commitId);
    var data = {'id' : r.data_retrieved[0].id,
                '_ref' : r.data_retrieved[0]._ref,
                'lastcommit' : commit,
                'active' : r.data_retrieved[0].active};
    if (!commit){
      r.status = 404;
      r.success = false;
    }
  }
  return basicParser.extendedParser(r, response, "rule", data, 200);
}

function obtainCommit(commits, commitId){
  for (var i = 0; i < commits.length; i++) {
    if (commits[i]._ref == commitId){
      return commits[i];
    }
  }
  return null;
}

function parserRunRules(r, response) {}

function parserRunRule(r, response) {
  return basicParser.extendedParser(r, response, "facts", r.data_retrieved, 200);
}


module.exports = {
  parserGetRules : parserGetRules,
  parserGetRule : parserGetRule,
  parserPostRule : parserPostRule,
  parserPutRule : parserPutRule,
  parserDeleteRule : parserDeleteRule,
  parserGetRuleCommits : parserGetRuleCommits,
  parserGetRuleCommit : parserGetRuleCommit,
  parserRunRules : parserRunRules,
  parserRunRule : parserRunRule
};
