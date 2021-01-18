//could be admin or maybe our team member?
//first name, last name, email, phone number, address, id number, department, wage, active/not active// 

//imports mongoose below
var mongoose = require('mongoose');


//userSchema can be any name you want below..
//using Json to define the different properties we want..
var userSchema = new mongoose.Schema({
    firstName: {
    type: String,
    required: true
},
    lastName: {
        type: String,
        required: true
},
    email: {
        type: String,
        required: true,
        unique: true
},
    userName: {
        type: String,
        required: true,
        unique: true 
},
    password: {
        type: String,
        required: true,

},
    deleted: {
        type: Boolean,
        default: false
},
    admin: {
        type: Boolean,
        default: false
 }
})

//Compile the Schema into a model by calling it
var User = mongoose.model('user', userSchema);

module.exports = User
//when you import the file you have access to the user model object