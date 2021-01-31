var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    loginId: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    wageRate: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

//Compile the Schema into a model by calling it
var Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee
//when you import the file you have access to the user model object
