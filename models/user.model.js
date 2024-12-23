const mongoose=require("mongoose")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLenght:[3,"First name must be atleast 3 characters long"]
        },
        lastName:{
            type:String,
            required:true,
            minLenght:[3,"Last name must be atleast 3 characters long"]
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String,
        required:false
    }
})


userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({userId:this._id},process.env.JWT_SECRET)
    return token
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}


const userModel=mongoose.model("user",userSchema)
module.exports=userModel