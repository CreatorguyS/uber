const userModel = require("../models/user.model")
const userService = require("../services/user.service")
const { validationResult } = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken.model")

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    
  
    if (!errors.isEmpty()) {
      
        return res.status(400).json({ error: errors.array() })
    }
    const { fullname, email, password } = req.body

    const isUser = await userModel.findOne({ email })
    if (isUser) {
        return res.status(400).json({ message: 'user already exists' })
    }
    const hashedPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })
    console.log("user",user)
    const token = await user.generateAuthToken()
   

    res.status(201).json({ user, token })
}

module.exports.loginUser = async (req, res, next) => {

    try {
        const errors = validationResult(req); // ✅ Corrected req instead of res
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() }); // ✅ Properly closes before moving forward
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = await user.generateAuthToken();
        res.cookie("token", token)

        res.status(200).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token")
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]
    await blacklistTokenModel.create({ token })
    res.status(200).json({ message: "logged out successfully" })
}