/**
 * Created by samiyuru on 5/5/14.
 */

var express = require('express');
var mongodb = require('mongodb');

var app  = express();

app.use('/', express.static('./public'));


mongodb.MongoClient.connect("mongodb://localhost/chatdb", function(err, db){

    if(err) throw err;

    app.post('/msg', function(req, res){
        var msgObj = {
            sender: req.query.sender,
            text:req.query.text,
            time: new Date().getTime()
        };
        var msgsCol = db.collection('msgs');
        msgsCol.insert(msgObj, function(err, docs){
            if(err){
                res.json({err:"failed to save the message"});
            }else{
                res.json({success:true, data:docs[0]});
            }
        });
    });


    app.get('/msg', function(req, res){
        var me  = req.query.me, time = parseInt(req.query.time);

        if(time == 0){
            res.json({success:true, data:[], lTime:new Date().getTime()});
        }else{
            var msgsCol = db.collection('msgs');
            msgsCol.find({
                sender:{
                    $ne:me
                },
                time:{
                    $gt:time
                }
            }).sort({time:1}).toArray(function(err, docs){
                    if(err){
                        res.json({err:"could not fetch messages"});
                    }else{
                        res.json({
                            success:true,
                            data:docs,
                            lTime:(docs.length == 0)?time:docs[docs.length - 1].time
                        });
                    }
                });
        }


        var msgsCol = db.collection('msgs');
    });


    app.listen(3000, function(){
        console.log("server started . . .");
    });

});