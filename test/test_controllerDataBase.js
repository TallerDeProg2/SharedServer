var assert = require('assert');
var controller = require('../src/controllers/controllerDataBase.js');
var logger = require('../src/srv/log.js');

//var uri = 'postgres://postgres:postgres@localhost:5432/postgres';
var uri = 'postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';
//TODO: run local/docker

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
  assert.equal(js.data.length, 0);
  done();
}

function parserDescTest(js, response, done){
  assert.equal(js.data[0].description, 'test');
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
   controller.query('Incorrect query;', "", parserStatus500, 200, done, uri);
 });

 it('returns status 500 if the query asks for a table that does not exist', function(done) {
   controller.query('SELECT * FROM null;', "", parserStatus500, 200, done, uri);
 });

 it('returns status 200 after creating a new table', function(done) {
   controller.query('CREATE TABLE testtable (id int, description text);', "", parserStatus200, 200, done, uri);
 });

 it('returns status 200 after accesing the new table', function(done) {
   controller.query('SELECT * FROM testtable;', "", parserStatus200, 200, done, uri);
 });

 it('the new table is empty', function(done) {
   controller.query('SELECT * FROM testtable;', "", parserNoData, 200, done, uri);
 });

 it('returns status 200 after inserting new item in testtable', function(done) {
   controller.query('INSERT INTO testtable(id, description) values(\'1\', \'test\');', "", parserStatus200, 200, done, uri);
 });

 it('returns desc "test" for id 1', function(done) {
   controller.query('SELECT * FROM testtable WHERE id=\'1\';', "", parserDescTest, 200, done, uri);
 });

 it('returns status 500 when trying to delete something that does not exist', function(done) {
   controller.query('DELETE * FROM testtable WHERE id=\'2\';', "", parserStatus500, 200, done, uri);
 });

 it('returns status 200 when removing the testtable', function(done) {
   controller.query('DROP TABLE testtable;', "", parserStatus200, 200, done, uri);
 });



});