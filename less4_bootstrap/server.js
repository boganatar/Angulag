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


app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/angular_session'
    }),
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

app.get("/notes", function(req,res) {
    res.send(req.session.notes||[]);
});


app.post("/notes", function(req, res) {
    if (!req.session.notes) {
        req.session.notes = [];
        req.session.last_note_id = 0;
    }
    var note = req.body;
    note.id = req.session.last_note_id;
    req.session.last_note_id++;
    req.session.notes.push(note);
    res.end();
});

db.collection('sections', function(error, sections) {
    db.sections = sections;
});

app.get("/sections", function(req,res) {
    db.sections.find(req.query).toArray(function(err, items) {
        res.send(items);
    });
});

app.post("/sections/replace", function(req,resp) {
// do not clear the list
    if (req.body.length==0) {
        resp.end();
    } db.sections.remove({}, function(err, res) {
        if (err) console.log(err);
        db.sections.insert(req.body, function(err, res) {
            if (err) console.log("err after insert",err);
            resp.end();
        });
    });
});
