const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require('bcrypt');
const captainModel = require("../models/captain.model");
const BlackListTokenModel = require("../models/blackListToken.model");

module.exports.authUser=async function(req,res,next){
    try{
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1]
        if(!token) return res.status(401).json({message:"Unauthorized"})
        const isBlackListed=await BlackListTokenModel.findOne({token})
        if(isBlackListed) return res.status(401).json({message:"Unauthorized"})
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findOne({_id:decoded.userId})
        req.user=user
        next()
    }
    catch(e){
        res.status(401).send({error:"Please authenticate"})
    }
}

module.exports.authCaptain=async function(req,res,next){
    try{
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1]
        console.log(token)
        if(!token) return res.status(401).json({message:"Unauthorized"})
        const isBlackListed=await BlackListTokenModel.findOne({token})
        console.log(isBlackListed)
        if(isBlackListed) return res.status(401).json({message:"Unauthorized"})
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        const captain=await captainModel.findById(decoded.captainId)
        req.captain=captain
        next()
    }
    catch(e){
        res.status(401).send({error:"Please authenticate"})
    }
}