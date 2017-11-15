var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function parserGetRules(r, response) {}

function parserGetRule(r, response) {}

function parserPostRule(r, response) {}

function parserPutRule(r, response) {}

function parserDeleteRule(r, response) {}

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
