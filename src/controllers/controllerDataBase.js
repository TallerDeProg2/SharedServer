var pg = require('pg');
var uri_def='postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';

var logger = require('../srv/log.js');

//------------------------->Aux Private Functions<-------------------------//
function _actualQuery(client, q, parser, response, complete, done){
  client.query(q, function(err, result) {
    done();
      if (err){
        logger.error("Unexpected error" + err);
        return parser({'success': false, 'status': 500, 'data': err}, response, complete); //Unexpected error.
      }
      else{
        results = result.rows;
        logger.info("Query, retrieved: "+ results);
        return parser({'success': true, 'status': 200, 'data': results}, response, complete);
      }
  });
}

function unexpectedError(err, response, complete){
  logger.error("Unexpected error" + err);
  return parser({'success': false, 'status': 500, 'data': err}, response, complete); //Unexpected error.
}

//-----------------------------------------------------------------------//

function query(q, response, parser, auth=null, complete=null, uri=uri_def){
  logger.info("Query, message: "+ q);
  pg.connect(uri, function(err, client, done) {
    if(err){
      done();
      return unexpectedError(err, response, complete);
    }
    if (!auth){
      return _actualQuery(client, q, parser, response, complete, done);
    }
    client.query(auth.query(), function(err, result){
      if (err){
        done();
        return unexpectedError(err, response, complete);
      }
      var result_auth = auth.checkAuthorization(result);
      if (!result_auth.success){
        done();
        return parser(result_auth, response, complete);
      }
      return _actualQuery(client, q, parser, response, complete, done);
    });
  });
}

module.exports.query = query;
