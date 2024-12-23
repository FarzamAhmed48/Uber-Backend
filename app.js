const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const cors=require("cors");
const connectToDB = require("./db/db");
const userRoutes=require("./routes/user.routes")
const cookieParser=require("cookie-parser")
const app=express();
connectToDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",async (req,res)=>{
    res.send("SERVER running")
})

app.use("/user",userRoutes)

module.exports=app