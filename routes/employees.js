//This is a template route, you can use this almost always to do any sort of verification.
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var Employee = require('../models/employee');
const TimeClock = require('../models/timeclock');


var tokenService = require('../services/auth');
var passwordService = require('../services/password');

// //route to get user profile information -> /profile
router.post('/register', async (req, res, next) => {
  // console.log(req.headers);
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentEmployee = await tokenService.verifyToken(myToken);
    console.log(currentEmployee);


    if (currentEmployee) {
      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>>BELOW
      //So, your Route Logic Goes Here, below
      try {
        console.log(req.body);
        let newEmployee = new Employee({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          loginId: req.body.loginId,
          streetAddress: req.body.streetAddress,
          state: req.body.state,
          zipCode: req.body.zipCode,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          position: req.body.position,
          department: req.body.department,
          wageRate: req.body.wageRate,
        });
        console.log(newEmployee)
        let result = await newEmployee.save();
        // console.log(result);
        res.json({
          message: "Employee created successfully",
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

      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>ABOVE
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
      let currentTimeClock = await TimeClock.findOne({  //is currentTimeClock null? iF currentTimeClock is not null, then send a message you are already clocked in
        employeeId: currentEmployee._id,                 
        clockOut: null
      })
      if (currentTimeClock) {
        res.json({
          message: "YOU ARE ALREADY CLOCKED IN",
          status: 403,
        })
      } else {

        let newClockIn = new TimeClock({   //if it is null then it will clock in the employee witht the new timestamp/ new Date function
          clockIn: new Date(),
          employeeId: currentEmployee._id
        })
        let result = await newClockIn.save();
        console.log(result);
        res.json({
          message: "WELCOME! HAVE A GREAT DAY!",
          status: 200,
          time: newClockIn.clockIn,
          firstName: currentEmployee.firstName,
          lastName: currentEmployee.lastName
        })
      }
    }
    catch (error) {
      res.json({
        message: "YOU ARE NOT CLOCKED IN",
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
  let currentEmployee = await Employee.findOne({  // we are assinging a variable of currentEmployee to find one employee 1 employee by their loginId
    loginId: req.body.loginId
  })
  // console.log(new Date()); 
  if (currentEmployee) {  //if the variable of current Employee is found, then first we will console.log ourselves to see the timestamp
    console.log(new Date());
  try {
    console.log(currentEmployee._id)
    let currentTimeClock = await TimeClock.findOne({ //then we will try to assign the variable CurrentTimeClock to find the employee by Id and a clockout of null
      employeeId: currentEmployee._id,
      clockOut: null
    })
    currentTimeClock.clockOut = new Date();  //when currentTimeClock  accesses the clockout property it assigns a new Date
    console.log(currentTimeClock)
    let Clock = await TimeClock.findByIdAndUpdate(currentTimeClock._id, currentTimeClock);  // Then we will assign the clock variable to find an employee by Id
    console.log(Clock)
let timeWorked = (currentTimeClock.clockOut - currentTimeClock.clockIn)

    res.json({
      message: "GREAT JOB!  REST WELL!",
      status: 200,
      time: currentTimeClock.clockOut,
      timeWorked
    })
  }
  catch (error) {
    res.json({
      message: "YOU ARE NOT CLOCKED IN",
      status: 403,
    })
  }
}
})

router.get("/getallemployees", async (req, res) => {
  let employeeList = await Employee.find({
  }).select({ "firstName": 1, "lastName": 1, "department": 1})
  res.json ({
    message: "found employee list",
    status: 200,
    employeeList
  })
} )

// router.get("/getoneemployee/:id", async (req, res) => {
//   let employeeOne = await Employee.findById({
//   }).select({ "_id": 1, "firstName": 1, "lastName": 1, "department": 1})
//   res.json ({
//     message: "found employee list",
//     status: 200,
//     employeeList
//   })
// } )

router.get("/getoneemployee/:id", async (req, res, next) => {
  Employee.findById(req.params.id).then(employee => {
    try{
      if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found!" });
    }
    }
    catch (error) {
      res.json({
        message: "Error creating clockout",
        status: 403,
      })
    }
  });
});

module.exports = router;
