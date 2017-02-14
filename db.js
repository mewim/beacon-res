var MongoClient = require('mongodb').MongoClient;

var DB_PATH = "mongodb://admin:12345678@ds153239.mlab.com:53239/heroku_j86p4m70";

module.exports = {
    conn: function (callback) {
        MongoClient.connect(DB_PATH, function (err, db) {
            assert.equal(null, err);
            return callback(db);
        });
    }
};
