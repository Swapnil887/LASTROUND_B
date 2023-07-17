const express = require("express");
const { Usermodel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


userRouter.post("/register", async (req, res) => {
  const { name, email} = req.body;
  
  let data = await Usermodel.find({ email: email });
  try {
    if (data.length > 0) {
      return res.json({email});
    } else {
      
          const userData = new Usermodel({
            name,
            email,
          });
          
          console.log(userData)
          var x = await userData.save();
          console.log(x)
          res.json({email});
    }
      
    
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while registering user");
  }
});



module.exports = {userRouter}