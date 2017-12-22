/** @module controllerToken */

var token_count = 0;

/**
 * @function createRef for morgan to use for logging http requests.
 * @memberof module:controllerToken
 * @returns a token (number).
 * @deprecated
 */
function createToken(){
  token_count += 1;
  return token_count;
}

module.exports.createToken = createToken;
