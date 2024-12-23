const userModel = require("../models/user.model");
const userService=require("../services/user.service")
const {validationResult}=require("express-validator")
module.exports.registerUser=async function(req,res,next){
    const error=validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }


    const {fullName,lastName,email,password}=req.body
    const hashedPassword=await userModel.hashPassword(password)

    const user=await userService.createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword
    })

    const token=user.generateAuthToken()
    res.status(201).json({token,user})
}

module.exports.loginUser=async function(req,res,next){
    const error=validationResult(req)

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const {email,password}=req.body
    const user=await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(401).json({error:"Invalid Email or Password"})
    }

    const isMatch=await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({error:"Invalid Email or Password"})
    }

    const token=user.generateAuthToken()
    res.status(200).json({token,user})
}