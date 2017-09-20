var token_count = 0;

function createToken(){
  token_count += 1;
  return token_count;
}

module.exports.createToken = createToken;
