//This is a template route, you can use this almost always to do any sort of verification.



//route to get user profile information -> /profile
router.get('/profile', async (req,res,next)=>{
    // console.log(req.headers);
    let myToken = req.headers.authorization;
    console.log(myToken);
  
    if(myToken){
  let currentUser = await tokenService.verifyToken(myToken);
  console.log(currentUser);
  
  
  if(currentUser){
      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>>BELOW
      //So, your Route Logic Goes Here, below
    let responseUser = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      userName: currentUser.userName,
      deleted: currentUser.deleted,
      admin: currentUser.admin
    }
  res.json({
    message: "User profile information loaded successfully",
    status: 200,
    user: responseUser
  })
     //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>ABOVE
  }
  else{
    res.json({
      message: "Token was invalid or expired",
      status: 403,
    })
  }
    }
    else{
      res.json({
        message: "No Token Received",
        status: 403,
      })
    }
  })


  //route to get user profile information -> /profile
router.get('/profile', async (req,res,next)=>{
    // console.log(req.headers);
    let myToken = req.headers.authorization;
    console.log(myToken);
  
    if(myToken){
  let currentUser = await tokenService.verifyToken(myToken);
  console.log(currentUser);
  
  
  if(currentUser){
      //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>>BELOW
      //So, your Route Logic Goes Here, below
    let responseUser = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      userName: currentUser.userName,
      deleted: currentUser.deleted,
      admin: currentUser.admin
    }
  res.json({
    message: "User profile information loaded successfully",
    status: 200,
    user: responseUser
  })
     //This is the CONTENT THAT WILL CHANGE MOSTLY FOR THIS TEMPLATE >>ABOVE
  }
  else{
    res.json({
      message: "Token was invalid or expired",
      status: 403,
    })
  }
    }
    else{
      res.json({
        message: "No Token Received",
        status: 403,
      })
    }
  })