/**
 * Created by DSK20 on 06.09.2016.
 */

var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

app.get("/greeting", function(req,res) {
    res.send("Hello, "+req.query.name+"! I’m server!");
});
