const captainModel=require('../models/captain.model')

module.exports.addCaptain=async({firstName,lastName,email,password,color,numberPlateNo,capacity,vehicleType})=>{
    if(! firstName ||!email ||!password ||!color ||!numberPlateNo ||!capacity ||!vehicleType){
        throw new Error("All fields are required")
    }
    const captain=captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            numberPlateNo,
            capacity,
            vehicleType
        }
    })
    return captain
}