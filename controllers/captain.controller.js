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
