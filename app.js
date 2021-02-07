var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//create variable to import mongoose library//
var mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');

//APP is running at PORT 5000//
var app = express();
//middleware for cors
//Might have to add to this later down the road...
app.use(cors());


//Mongo Connection//
var connectionString = "mongodb+srv://dbuser:Password1!@cluster0.4t6zy.mongodb.net/KBtimeclock?retryWrites=true&w=majority";
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
app.use('/api/users', usersRouter);                 //This route is called Admin model instead of User-- may need changed in the future for connection
app.use('/api/employees', employeesRouter);


module.exports = app;
