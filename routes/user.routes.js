const express=require("express")
const {body}=require("express-validator")
const userController=require("../controllers/user.controller")
const authMiddleware=require("../middlewares/auth.middleware")
const router=express.Router()

router.post("/add-user",[
    body('email').isEmail().withMessage("Invalid Message"),
    body("fullName.firstName").isLength({min:3}).withMessage("First Name Should atleast contain 3 letters"),
    body("password").isLength({min:6}).withMessage("Password Should atleast contain")

],userController.registerUser)


router.post("/login",[
    body('email').isEmail().withMessage("Invalid Message"),
    body("password").isLength({min:6}).withMessage("Password Should atleast contain 6 letters")
],
    userController.loginUser
)

router.get("/profile",authMiddleware.authUser,userController.getUserProfile)
router.get("/logout",authMiddleware.authUser,userController.logoutUser)

module.exports=router