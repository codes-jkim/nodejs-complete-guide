const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
MongoClient.connect('mongodb+srv://codesjkim:dzw6YXchswctvllh@cluster0.0kzq8cx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
  .then(client => {
    _db = client.db();
    cb()
  })
  .catch(err => {
    console.error(err);
    throw err;
  }
)};
const getDb = () => {
    if(_db){
        return _db
    } 
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;