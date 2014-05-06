/**
 * Created by samiyuru on 5/5/14.
 */

var express = require('express');
var mongodb = require('mongodb');

var app  = express();

app.use('/', express.static('./public'));

app.listen(3000, function(){
    console.log("server started . . .");
});