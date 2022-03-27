const express=require("express");
const { body, validationResult } = require('express-validator');

const User=require("../model/usermodel");

const router=express.Router();

router.post("/",body("firstName").not().isEmpty().isLength({min:4}),
body("email").isEmail().custom(async(value)=>{
    const user=await User.findOne({email:value});

    if(user){
        throw new Error("Email already exist")
    }
    return true;
}),

body("age").not().isEmpty().withMessage("age cannot be empty").
isNumeric().withMessage("age must be a number between 1 and 120").
custom((value)=>{
    if(value <1 || value>120){
        throw new Error ("Incorrect age provided")
    }
    return true;
}),

body("password").not().isEmpty().withMessage("password is required").custom((value)=>{

    var passw= /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
    if(! value.match(passw)) 
    { 
   throw new Error("password must be strong")
}
return true;
})
.custom((value,{req})=>{
if(value!==req.body.confirmpassword){
throw new Error ("Password and confirm password should match")
}
return true;
}),

async(req,res)=>{

    try {
         console.log(body("firstName"))
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const user=await User.create(req.body);
        return res.status(201).send(user)

        
    } catch (err) {

        return res.status(404).send({message:err.message})
        
    }
}),

module.exports=router;