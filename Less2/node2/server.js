var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(3000);

app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true
}));

/*app.get("/notes", function(req,res) {
    res.send(req.session.notes||[]);
});*/

/*
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
});*/
app.post("/notes", function(req, res) {
    var note = req.body;
    var noteText = JSON.stringify(note)+"\n";
    fs.appendFile("notes.json", noteText, function(err) {
        if (err) console.log("something is wrong");
        res.end();
    });
});

app.get("/notes", function(req,res) {
    fs.readFile("notes.json", function(err, result) {
        if (result) {
            result = ""+result; // convert Object to String
//remove last \n in file
            result = result.substring(0, result.length - 1);
            result = "["+result+"]";
            result = result.split("\n").join(",");
            res.send(result);
        } else {
            res.end();
        }
    });
});