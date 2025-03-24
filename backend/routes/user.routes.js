const express=require("express")
const router=express.Router()
const {body}=require("express-validator")
const userController=require("../controllers/user.controller")
router.post("/register",[
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('use longer name'),
    body('password').isLength({min:6}).withMessage('password must be 6 word or more')
],
   userController.registerUser
)


module.exports=router