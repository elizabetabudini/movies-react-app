var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var request = require("request");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fetch = require("node-fetch");

var app = express();
var port = 3000;
// required library for MongoDB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var rp = require('request-promise');
var Promise = require("bluebird");
var async = require("async");
var rest = require("restling");


MongoClient.connect(url, function (err, dbo) {
    if (err) throw err;
    var db = dbo.db("myfilmdb");
    function query(callback) {
        db.collection("filmIDs").find().limit(5).toArray(function (err, movieArray) {
            if (err) throw err;
            var arrayOfFunctions = [];
            movieArray.forEach(elem => {
                arrayOfFunctions.push(
                    function a(callback) {
                        fetch('https://www.myapifilms.com/imdb/idIMDB?idIMDB=' + elem.idIMDB + "&filmingLocations=2&token=1bf01ce7-3ce3-4972-8284-34433c0fc018")
                            .then(response => response.json())
                            .then(data => {
                                console.log(data.data);
                                if(data.data == undefined){
                                    console.log(data);
                                    //delete incorrect id from database of ids
                                    db.collection("filmIDs").deleteOne({idIMDB: elem.idIMDB}, function (err, res) {
                                        if (err) throw err;
                                        console.log("1 incorrect document deleted");
                                    });
                                    callback(null, null);
                                } else {
                                    callback(null, data.data.movies[0]);
                                }

                            })
                            .catch(err => console.log(err))
                    });
            });

            async.series(
                // Building an array of functions to pass to Async. They will be executed one after the other, when done() is called
                //callYourApi(elem, result => done(null, result)) // 1st argument = error, null == no error
                arrayOfFunctions,
                function (err, results) { // Global callback when all the calls are finished (or when an error occured in the chain)
                    // results is now an array of all the "result" of every call
                    var toInsert=[];
                    for (let j = 0; j < results.length; j++) {
                        var movie = results[j];
                        if (movie != null) {
                            if (movie.filmingLocations != null) {
                                toInsert.push(movie);
                            }
                        }
                    }
                    db.collection("filmsList").insertMany(toInsert, {upsert:true}, function (err, res) {
                        if (err) throw err;
                        console.log("documents updated: "+res.insertedCount);
                    });
                    // delete all documents in result array HOW?
                    callback();

                });
        });
    }


    function wait10sec(){
        setTimeout(function(){
            query(wait10sec);
        }, 10000);
    }

    query(wait10sec);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;


