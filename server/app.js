var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

let config = {
  apiKey: 'AIzaSyDH675NFfG5rUHEECwfVgzxN79yW4TxdYs',
  authDomain: 'filmproject-87d6c.firebaseapp.com',
  databaseURL: 'https://filmproject-87d6c.firebaseio.com',
  projectId: 'filmproject-87d6c',
  storageBucket: 'filmproject-87d6c.appspot.com',
  messagingSenderId: '65851562381',
  appId: '1:65851562381:web:dd4ee05b588230df9205c4',
};


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://filmproject-87d6c.firebaseio.com"
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
