//THIS is our ADMIN USER PAGE
//first name, last name, email,username, password

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
        default: true
 }
})

//Compile the Schema into a model by calling it
var User = mongoose.model('user', userSchema);  //This route is called Admin model instead of User-- may need changed in the future for connection

module.exports = User                            //This route is called Admin model instead of User-- may need changed in the future for connection
//when you import the file you have access to the user model object