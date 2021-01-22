//imports mongoose below
var mongoose = require('mongoose');


//userSchema can be any name you want below..
//using Json to define the different properties we want..
var timeClockSchema = new mongoose.Schema({

    clockIn: {
        type: Date,
        required: true
},
    clockOut: {
        type: Date,
        required: false
},
    employeeId: {
        type: mongoose.ObjectId,
        required: true
 }
})

//Compile the Schema into a model by calling it
var TimeClock = mongoose.model('timeClock', timeClockSchema);

module.exports = TimeClock
//when you import the file you have access to the user model object