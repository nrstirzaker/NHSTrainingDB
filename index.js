const express = require('express')
const app = express()
const mongoClient = require('./datasource.js');
var mongodb = require('mongodb')
var config = require('./config');
const port = config.server.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var db

app.get('/', (req, res) => res.send('Server is running'))


// --- training ---

app.get('/training', function (req, res) {
    db.collection('training').find().toArray(function (err, results) {
        if (err) {
            return console.log(err)
        }
        res.send(results);
    })
})

app.delete('/training/:id', function (req, res) {
    console.log("training:delete:id: " + req.params.id);
    db.collection('training').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

app.post('/training', function (req, res) {
    console.log("training:insert: " + req.body);
    db.collection('training').insertOne(req.body, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});
// --- role ---
app.get('/role', function (req, res) {
    db.collection('role').find().toArray(function (err, results) {
        if (err) {
            return console.log(err)
        }
        res.send(results);
    })
})

app.post('/role', function (req, res) {
    console.log("role:insert: " + req.body);
    db.collection('role').insertOne(req.body, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

app.delete('/role/:id', function (req, res) {
    console.log("role:delete:id: " + req.params.id);
    db.collection('role').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

// --- equipment ---

app.get('/equipment', function (req, res) {
    db.collection('equipment').find().toArray(function (err, results) {
        if (err) {
            return console.log(err)
        }
        res.send(results);
    })
})

app.post('/equipment', function (req, res) {
    console.log("equipment:insert: " + req.body);
    db.collection('equipment').insertOne(req.body, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

app.delete('/equipment/:id', function (req, res) {
    console.log("equipment:delete:id: " + req.params.id);
    db.collection('equipment').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

// --- staff --- 

app.get('/staff', function (req, res) {
    db.collection('staff').find().toArray(function (err, results) {
        if (err) {
            return console.log(err)
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(results);
    })
})

app.post('/staff', function (req, res) {
    console.log("staff:insert: " + req.body);
    db.collection('staff').insertOne(req.body, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

app.delete('/staff/:id', function (req, res) {
    console.log("delete id: " + req.params.id);
    db.collection('staff').deleteOne({_id: new mongodb.ObjectID(req.params.id)}, function (err, result) {
        if (err) {
            return console.log(err)
        }
        res.sendStatus(200);
    });
});

mongoClient.connectToServer(function (err) {
    app.listen(port, function () {
        console.log('Node server listening on ' + port);
        db = mongoClient.getDb();
    })
});