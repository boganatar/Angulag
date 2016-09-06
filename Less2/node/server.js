/**
 * Created by DSK20 on 06.09.2016.
 */

var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);



app.use(session({
    secret: 'angular_tutorial',
    resave: true,
    saveUninitialized: true,
}));
app.get("/notes", function(req,res) {
    res.send(req.session.notes||[]);
});

app.get("/greeting", function(req,res) {
    //res.send("Hello, "+req.query.name+"! I’m server Node JS!");
    req.session.userName = req.query.name;
    res.send();
});

app.get("/getname", function(req,res) {
    res.send(req.session.userName);
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
