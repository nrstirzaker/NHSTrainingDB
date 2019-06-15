const express = require('express')
const app = express()
const mongodb = require('./datasource.js');
var config = require('./config');
const port = config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db

app.get('/', (req, res) => res.send('Server is running'))



app.get('/staff', function (req, res) {
    db.collection('staff').find().toArray(function (err, results) {
        if (err) {
            return console.log(err)
        }
        res.send(results);
    })
})

app.post('/staff', function (req, res) {
    db.collection('staff').insertOne(req.body, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

mongodb.connectToServer(function (err) {
    app.listen(port, function () {
        console.log('Node server listening on ' + port);
        db = mongodb.getDb();
    })
});