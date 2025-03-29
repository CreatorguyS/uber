const captainModel = require("../models/captain.models")
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model"); // ✅ Import blacklistTokenModel

module.exports.registerCaptain = async (req, res) => {
    try {
        console.log("Received data:", JSON.stringify(req.body, null, 2));  // Debugging log

        const { fullname, email, password, vehicle } = req.body;

        // Ensure fields exist before destructuring
        if (!fullname || !fullname.firstname || !fullname.lastname ||
            !email || !password ||
            !vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
            console.log("Invalid request body:", req.body);  // Debug log
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if captain already exists
        const isCaptain = await captainModel.findOne({ email });
        if (isCaptain) {
            return res.status(400).json({ message: "Captain already exists" });
        }

        // Hash password before saving
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        if (!captain) {
            return res.status(500).json({ message: "Failed to create captain" });
        }

        // Generate authentication token
        const token = await captain.generateAuthToken();

        res.status(201).json({ captain, token });

    } catch (error) {
        console.error("Error in registerCaptain:", error);
        res.status(500).json({ message: error.message });
    }
};


module.exports.loginCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await captainModel.findOne({ email }).select("+password");

        if (!captain) {
            return res.status(400).json({ message: "Captain not found" });
        }

        // Compare passwords correctly
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = await captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain });

    } catch (error) {
        console.error("Error in loginCaptain:", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1] || null;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        await blacklistTokenModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Error in logoutCaptain:", error);
        res.status(500).json({ message: error.message });
    }
};
