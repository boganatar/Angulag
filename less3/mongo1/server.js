var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoStore = require('connect-mongo/es5')(session);
var ObjectID = require('mongodb').ObjectID;

var db = new Db('tutor',
    new Server("localhost", 27017, {safe: true},
        {auto_reconnect: true}, {}));
db.open(function(){
    console.log("mongo db is opened!");
});

db.collection('notes', function(error, notes) {
    db.notes = notes;
});

var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3000);

app.get("/notes", function(req,res) {
    db.notes.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});
//lastUpdated:new Date().getTime()
app.post("/notes", function(req,res) {
    req.body.time = new Date().getTime();
    db.notes.insert(req.body);
    res.end();
});

app.delete("/notes", function(req,res) {
    var id = new ObjectID(req.query.id);
    db.notes.remove({_id: id}, function(err){
        if (err) {
            console.log(err);
            res.send("Failed");
        } else {
            res.send("Success");
        }
    })
});


