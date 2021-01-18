var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//create variable to import mongoose library//
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//APP is running at PORT 5000//
var app = express();

//Mongo Connection//
var connectionString = "mongodb://127.0.0.1/express-api";
mongoose.connect(connectionString, {useNewUrlParser:true,useUnifiedTopology: true}, 
    function(){
        console.log("database is connected");
    })


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;
