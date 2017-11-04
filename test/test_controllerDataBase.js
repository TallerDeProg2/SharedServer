var assert = require('assert');
var controller = require('../src/controllers/controllerData/controllerDataBase.js');
var logger = require('../src/srv/log.js');

//------------->Parsers for testing<---------------//
function parserStatus500(js, response, done){
  assert.equal(js.status, 500);
  done();
}

function parserStatus200(js, response, done){
  assert.equal(js.status, 200);
  done();
}

function parserNoData(js, response, done){
  assert.equal(js.data_retrieved.length, 0);
  done();
}

function parserDescTest(js, response, done){
  assert.equal(js.data_retrieved[0].description, 'test');
  done();
}

//-----------------------------------------------//

describe('controllerDataBase', function() {

  beforeEach(function(done){
    setTimeout(function(){
      done();
    }, 200);
  });

 it('returns status 500 if the query is "Incorrect query;"', function(done) {
   controller.query('Incorrect query;', "", parserStatus500, null, done);
 });

 it('returns status 500 if the query asks for a table that does not exist', function(done) {
   controller.query('SELECT * FROM null;', "", parserStatus500, null, done);
 });

 it('returns status 200 after creating a new table', function(done) {
   controller.query('CREATE TABLE testtable (id int, description text);', "", parserStatus200, null, done);
 });

 it('returns status 200 after accesing the new table', function(done) {
   controller.query('SELECT * FROM testtable;', "", parserStatus200, null, done);
 });

 it('the new table is empty', function(done) {
   controller.query('SELECT * FROM testtable;', "", parserNoData, null, done);
 });

 it('returns status 200 after inserting new item in testtable', function(done) {
   controller.query('INSERT INTO testtable(id, description) values(\'1\', \'test\');', "", parserStatus200, null, done);
 });

 it('returns desc "test" for id 1', function(done) {
   controller.query('SELECT * FROM testtable WHERE id=\'1\';', "", parserDescTest, null, done);
 });

 it('returns nothing when trying to delete something that does not exist', function(done) {
   controller.query('DELETE FROM testtable WHERE id=\'2\' RETURNING *;', "", parserNoData, null, done);
 });

 it('returns status 200 after deleting something', function(done) {
   controller.query('DELETE FROM testtable WHERE id=\'1\' RETURNING *;', "", parserStatus200, null, done);
 });

 it('returns status 200 when removing the testtable', function(done) {
   controller.query('DROP TABLE testtable;', "", parserStatus200, null, done);
 });

});
