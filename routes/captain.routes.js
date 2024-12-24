const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const captainController=require("../controllers/captain.controller")

router.post("/add-captain",[
    body('email').isEmail().withMessage("Invalid Message"),
    body("fullName.firstName").isLength({min:3}).withMessage("First Name Should atleast contain 3 letters"),
    body("password").isLength({min:6}).withMessage("Password Should atleast contain"),
    body("vehicle.capacity").isInt({min:1}).withMessage("Capacity should be atleast 1"),
    body("vehicle.vehicleType").isIn(["car","motorcycle","auto"]).withMessage("Invalid Vehicle Type"),
    body("vehicle.color").isLength({min:3}).withMessage("Color Should atleast contain 3 letters"),
    body("vehicle.numberPlateNo").isLength({min:3}).withMessage("Plate Number atleast 3 chars long")
],captainController.addCaptain)


module.exports=router