const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    fullname:{
     firstname:{
        type:String,
        required:true,
     },
     lastname:{
        type:String,
     }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId: {
        type:String,
    }
})
userSchema.methods.generateAuthToken=async function (){
    const user=this
    const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET, { expiresIn: '24h' })
    
    return token
}
userSchema.methods.comparePassword=async function (password){
    const user=this
    return await bcrypt.compare(password,user.password)
}
userSchema.statics.hashPassword=async function (password){
    return await bcrypt.hash(password,10)
}
const userModel=mongoose.model("user",userSchema)
module.exports=userModel