const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRoutes=require("./routes/captain.routes")
const app = express();

// Use CORS with credentials support
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware Order Matters!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Move this BEFORE routes

app.use('/users', userRoutes);
app.use('/captains',captainRoutes)

connectDB();

app.get("/", (req, res) => {
    res.send("hello world");
});

// Test cookies route
app.get("/test-cookies", (req, res) => {
    console.log("Cookies received:", req.cookies);
    res.json({ cookies: req.cookies });
});

module.exports = app;
