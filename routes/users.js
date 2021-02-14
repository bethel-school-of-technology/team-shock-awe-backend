var express = require('express');
var router = express.Router();
var User = require('../models/user');     //This route is called Admin model instead of User-- may need changed in the future for connection
var Employee = require('../models/employee');

var tokenService = require('../services/auth');
var passwordService = require('../services/password');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

//route for user registration (Add User)-> /register
//using the "try catch block"- allows you to catch any errors
router.post('/register', async (req, res, next) => {
  try {
    console.log(req.body);
    let newUser = new User({              //This route is called Admin model instead of User-- may need changed in the future for connection
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      userName: req.body.userName,
      password: passwordService.hashPassword(req.body.password)
    });
    console.log(newUser)
    let result = await newUser.save();
    // console.log(result);
    res.json({
      message: "User created Successfully",
      status: 200,
    })
  }
  catch (err) {
    console.log(err);
    res.json({
      message: "Error creating user",
      status: 403,
    })
  }
})



//route for login -> /login
router.post('/login', async (req, res, next) => {
  // console.log(req.body);
  User.findOne({ userName: req.body.userName }, function (err, user) {   //This route is called Admin model instead of User-- may need changed in the future for connection
    if (err) {
      console.log(err)
      res.json({
        message: "Error Accessing Database",   //error to show if the database is not connecting to the login 
        status: 500,
      })
    }
    console.log(user);
    if (user) {
      let passwordMatch = passwordService.comparePasswords(req.body.password, user.password);
      if (passwordMatch) {
        //Create token
        let token = tokenService.assignToken(user);
        res.json({
          // message: "Login was successful",
          status: 200,
          token
        })
      }
      else {
        console.log('Wrong Password');
        res.json({
          message: "INCORRECT PASSWORD",
          status: 403,
        })
      }
    }
    else {
      res.json({
        message: "THIS USERNAME DOESN'T EXIST",
        status: 403,
      })
    }
  })

})




//route to get user profile information -> /profile
router.get('/profile', async (req, res, next) => {
  console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);
    let employeeList = await Employee.find({

    })

    if (currentUser) {
      let responseUser = {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        userName: currentUser.userName,
        deleted: currentUser.deleted,
        admin: currentUser.admin,
        employeeList
      }
      res.json({
        message: "User profile information loaded successfully",
        status: 200,
        user: responseUser
      })
    }
    else {
      res.json({
        message: "Token was invalid or expired",
        status: 403,
      })
    }
  }
  else {
    res.json({
      message: "No Token Received",
      status: 403,
    })
  }
})


//Update Route for Staff info changes

router.put('/update/:id', async (req, res, next) => {
  // console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {   //if my My Token is authorized for the current user then allow currentuser to login using the new verified Token. 
    let currentUser = await tokenService.verifyToken(myToken);  
    console.log(currentUser); 

    if (currentUser) { 
      let currentId = req.params.id;   //if the current user is verified then let the current Id user result in an updated Json body 'form"

     
      let result = await Employee.findOneAndUpdate({_id:currentId}, {$set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        loginId: req.body.loginId,
        streetAddress: req.body.streetAddress,
        state: req.body.state,
        zipCode: req.body.zipCode,
        phoneNumber: req.body.phoneNumber,
        position: req.body.position,
        department: req.body.department,
        wageRate: req.body.wageRate,
        active: req.body.active,
        admin: req.body.admin
        
      } })
      console.log(result)
      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>>BELOW
      //So, your Route Logic Goes Here, below

      res.json({
        message: "User profile information updated successfully",
        status: 200,
        // user: currentUser
      })
      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>ABOVE
    }
  }
  else {
    res.json({
      message: "Token was invalid or expired",
      status: 403,
    });
  }
})



module.exports = router;
