var express = require('express');

var app = express();
app.listen(3003);

app.get("/notes", function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var notes = [
        {text: "First note"},
        {text: "Second note"},
        {text: "Third note"}
    ]
    res.send(notes);
});