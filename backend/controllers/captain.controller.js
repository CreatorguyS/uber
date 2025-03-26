const captainModel = require("../models/captain.models");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log("Received data:", req.body);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

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
