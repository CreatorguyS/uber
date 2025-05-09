const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

console.log("Captain Controller:", captainController); // Debugging

router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email"),
        body("fullname.firstname").isLength({ min: 3 }).withMessage("Firstname must be at least 3 characters"),
        body("fullname.lastname").isLength({ min: 3 }).withMessage("Lastname must be at least 3 characters"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
        body("vehicle.color").isLength({ min: 3 }).withMessage("Color must be at least 3 characters"),
        body("vehicle.plate").isLength({ min: 3 }).withMessage("Plate must be at least 3 characters"),
        body("vehicle.capacity").isNumeric().withMessage("Capacity must be a number"),
        body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type"),
    ],
    captainController.registerCaptain
);

router.post("/login", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], captainController.loginCaptain);

router.get("/profile", authMiddleware.authCaptain, captainController.getCaptainProfile);

router.post("/logout", authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
