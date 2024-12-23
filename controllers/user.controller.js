const BlackListTokenModel = require("../models/blackListToken.model");
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
    res.cookie("token",token,{httpOnly:true})
    res.status(200).json({token,user})
}

module.exports.getUserProfile=async function(req,res,next){
    res.status(200).json(req.user)
}

module.exports.logoutUser=async function(req,res,next){
    res.clearCookie("token")
    const token=req.cookies.token || req.headers.authorization.split(" ")[1]
    await BlackListTokenModel.create({token})
    res.status(200).json({message:"Logged Out Successfully"})
}
