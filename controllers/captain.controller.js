const BlackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
module.exports.addCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { fullName, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({error:"Captain already exist"})    
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain=captainService.addCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword,
        color:vehicle.color,
        numberPlateNo:vehicle.numberPlateNo,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType

    })
}

module.exports.loginCaptain = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;       
    const captain = await captainModel.findOne({email}).select("+password");
    if(!captain){
        return res.status(400).json({error:"Captain does not exist"})
    }
    const isPasswordMatched = await captain.comparePassword(password);
    if(!isPasswordMatched){
        return res.status(400).json({error:"Invalid Password"})
    }
    const token = captain.generateAuthToken();
    res.cookie("token",token,{httpOnly:true})
    console.log(token)

    return res.status(200).json({token,captain})
    
}

module.exports.getCaptainProfile = async (req, res) => {

    res.status(200).json({captain:req.captain})
}


module.exports.logoutCaptain = async (req, res) =>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1]
    await BlackListTokenModel.create({token})
    res.clearCookie("token")
    res.status(200).json({message:"Captain Logged Out"})
}