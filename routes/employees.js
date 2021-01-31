//This is a template route, you can use this almost always to do any sort of verification.
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var Employee = require('../models/employee');
const TimeClock = require('../models/timeclock');


var tokenService = require('../services/auth');
var passwordService = require('../services/password');

// //route to get user profile information -> /profile
// router.post('/register', async (req, res, next) => {
//   // console.log(req.headers);
//   let myToken = req.headers.authorization;
//   console.log(myToken);

//   if (myToken) {
//     let currentEmployee = await tokenService.verifyToken(myToken);
//     console.log(currentEmployee);


//     if (currentEmployee) {
//       //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>>BELOW
//       //So, your Route Logic Goes Here, below
//       try {
//         console.log(req.body);
//         let newEmployee = new Employee({
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           loginId: req.body.loginId,
//           address: req.body.address,
//           zipCode: req.body.zipCode,
//           email: req.body.email,
//           phoneNumber: req.body.phoneNumber,
//           position: req.body.position,
//           department: req.body.department,
//           wageRate: req.body.wageRate,
//         });
//         console.log(newEmployee)
//         let result = await newEmployee.save();
//         // console.log(result);
//         res.json({
//           message: "Employee created successfully",
//           status: 200,
//         })
//       }
//       catch (err) {
//         console.log(err);
//         res.json({
//           message: "Error creating user",
//           status: 403,
//         })
//       }

//       //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>ABOVE
//     }
//     else {
//       res.json({
//         message: "Token was invalid or expired",
//         status: 403,
//       })
//     }
//   }
//   else {
//     res.json({
//       message: "No Token Received",
//       status: 403,
//     })
//   }
// })




router.post('/clockin', async (req, res, next) => {
  console.log(req.body);
  //find employee by Login Id and make sure its valid
  //need to make sure the person exists so preserve this.
  let currentEmployee = await Employee.findOne({
    loginId: req.body.loginId
  })
  if (currentEmployee) {
    console.log(new Date());  //< use for both clock in and clock out
    try {
      let currentTimeClock = await TimeClock.findOne({
        employeeId: currentEmployee._id,
        clockOut: null
      })
      if (currentTimeClock) {
        res.json({
          message: "You are already clocked in",
          status: 403,
        })
      } else {

        let newClockIn = new TimeClock({
          clockIn: new Date(),
          employeeId: currentEmployee._id
        })
        let result = await newClockIn.save();
        console.log(result);
        res.json({
          message: "Clockin created successfully",
          status: 200,
        })
      }
    }
    catch (error) {
      res.json({
        message: "Error creating clockin",
        status: 403,
      })
    }
  } else {
    res.json({
      message: "Did not find user",
      status: 403,
    })
  }
})

//CLOCK OUT ROUTE
router.post('/clockout', async (req, res) => {
  console.log(req.body);
  //find employee by Login Id and make sure its valid
  //need to make sure the person exists so preserve this.
  let currentEmployee = await Employee.findOne({  // add if statement if they are not the employee
    loginId: req.body.loginId
  })
  // console.log(new Date());  //< use for both clock in and clock out
  if (currentEmployee) {
    console.log(new Date());
  try {
    console.log(currentEmployee._id)
    let currentTimeClock = await TimeClock.findOne({
      employeeId: currentEmployee._id,
      clockOut: null
    })
    currentTimeClock.clockOut = new Date();
    console.log(currentTimeClock)
    let Clock = await TimeClock.findByIdAndUpdate(currentTimeClock._id, currentTimeClock);
    console.log(Clock)
    res.json({
      message: "Clockout created successfully",
      status: 200,
    })
  }
  catch (error) {
    res.json({
      message: "Error creating clockout",
      status: 403,
    })
  }
}
})
module.exports = router;
