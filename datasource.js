var MongoClient = require('mongodb').MongoClient;
var util = require('util');
var config = require('./config');
var _db;

var mongoUri = util.format('mongodb://%s:%s@%s:%d/%s',
    config.mongodb.username, config.mongodb.password, config.mongodb.host, config.mongodb.port, config.mongodb.databaseName);

module.exports = {
    connectToServer: function (callback) {
        /** Connect to the Mongo database at the URI using the client **/
        console.log(mongoUri);
        MongoClient.connect(mongoUri, { auto_reconnect: true, useNewUrlParser: true }, function (err, client) {
            if (err) throw err;
            else if (!client) {
                console.log('Unknown error connecting to database');
            }
            else {
                console.log('Connected to MongoDB database server at:');
                console.log('\n\t%s\n', mongoUri);
                _db = client.db('NHSTraning');
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};