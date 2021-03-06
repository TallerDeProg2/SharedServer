/** @module controllerDataBase */

/**
* controllerDataBase
*/

var promise = require('bluebird');
var options = {
  promiseLib: promise
};
var pgp_lib = require('pg-promise')(options);

var uri='postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';

if (process.env.URI){
  uri = process.env.URI;
}

var pg = require('pg');
var pg_promise = pgp_lib(uri);

var logger = require('../../srv/log.js');

//------------------------->Aux Private Functions<-------------------------//
function _actualQuery(client, q, parser, response, complete, done){
  client.query(q, function(err, result) {
    done();
      if (err){
        logger.error("Unexpected error in line 15" + err);
        return parser({'success': false, 'status': 500, 'data_retrieved': err}, response, complete); //Unexpected error.
      }
      else{
        results = result.rows;
        logger.info("Query, retrieved: "+ results);
        return parser({'success': true, 'status': 200, 'data_retrieved': results}, response, complete);
      }
  });
}

function unexpectedError(err, response, complete, parser){
  logger.error("Unexpected error" + err);
  logger.error(parser);
  return parser({'success': false, 'status': 500, 'data_retrieved': err}, response, complete); //Unexpected error.
}

//-----------------------------------------------------------------------//

/**
 * @function query performs a query to the database and makes a response to the request via a @link controllerParser function.
 * @param {string} q the query that will be performed.
 * @param {response} response the response that will be send to the request.
 * @param {Auth} auth an @Link Auth object, if it is null there is no authentication requested.
 * @param {function} complete extra function for testing reasons.
 * @memberof module:controllerDataBase
 */
function query(q, response, parser, auth=null, complete=null){
  logger.info("Query, message: "+ q);
  logger.info("urii: "+uri);
  pg.connect(uri, function(err, client, done) {
    if(err){
      done();
      logger.error("Unexpected error in line 39");
      return unexpectedError(err, response, complete, parser);
    }
    if (!auth){
      return _actualQuery(client, q, parser, response, complete, done);
    }
    client.query(auth.query(), function(err, result){
      if (err){
        done();
        logger.error(auth.query());
        logger.error("Unexpected error in line 47");
        return unexpectedError(err, response, complete);
      }
      var result_auth = auth.checkAuthorization({'success': true, 'status': 200, 'data_retrieved': result.rows});
      if (!result_auth.success){
        done();
        return parser(result_auth, response, complete);
      }
      return _actualQuery(client, q, parser, response, complete, done);
    });
  });
}

/**
 * @function promise_query_get a GET query in the form of a promise.
 * @param {string} q the query that will be performed.
 * @memberof module:controllerDataBase
 */
function promise_query_get(q){
  return pg_promise.any(q);
}

module.exports.query = query;
module.exports.promise_query_get = promise_query_get;
