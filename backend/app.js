const dotenv=require("dotenv")
dotenv.config()
const express=require("express")
const app=express()
const cors=require("cors")
const connectDB=require("./db/db")
const userRoutes=require("./routes/user.routes")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)
connectDB()

app.get("/",(req,res)=>{
    res.send("hello world")
})
module.exports=app