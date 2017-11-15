var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function rdata(data) {
  var rules = [];
  for (var i = 0; i < data.length; i++) {
    rules[i] = {'id' : data[i].id,
                '_ref' : data[i]._ref,
                'lastCommit' : data[i].commits[0],
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
    data = rdataPost(data)[0];
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

function parserGetRuleCommits(r, response) {}

function parserGetRuleCommit(r, response) {}

function parserRunRules(r, response) {}

function parserRunRule(r, response) {}


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
