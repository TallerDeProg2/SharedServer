var id_count = 0;

function createId(){
  id_count += 1;
  return id_count;
}

module.exports.createId = createId;
