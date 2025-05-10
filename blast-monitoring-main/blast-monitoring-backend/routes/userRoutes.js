const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Route for data entry user registration
router.post("/dataentry/register", async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ msg: "Email is required" });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(200).json({ msg: "Already exists" });
        }

        const user = new User({ email });
        await user.save();

        res.status(201).json({ msg: "Email saved successfully" });
    } catch (err) {
        console.error("Error storing email:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
