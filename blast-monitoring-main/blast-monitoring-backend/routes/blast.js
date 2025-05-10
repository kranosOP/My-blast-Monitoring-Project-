const express = require("express");
const router = express.Router();
const BlastEntry = require("../models/BlastEntry");

// Test route to verify server is working
router.get("/", (req, res) => {
    res.send("📡 Blast Entry API is active!");
});

// GET all blast entries - Default route
router.get("/", async (req, res) => {
    try {
        const entries = await BlastEntry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        console.error("❌ Error fetching blast data:", err);
        res.status(500).json({ msg: "❌ Error retrieving blast data" });
    }
});

// GET all blast entries - Explicit route
router.get("/all", async (req, res) => {
    try {
        const entries = await BlastEntry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (err) {
        console.error("❌ Error fetching blast data:", err);
        res.status(500).json({ msg: "❌ Error retrieving blast data" });
    }
});

// DELETE a blast entry
router.delete("/:id", async (req, res) => {
    try {
        const result = await BlastEntry.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ msg: "❌ Blast entry not found" });
        }
        console.log("✅ Blast entry deleted:", req.params.id);
        res.json({ msg: "✅ Blast entry deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting blast entry:", err);
        res.status(500).json({ msg: "❌ Error deleting blast entry" });
    }
});

// POST /api/blasts/add
router.post("/add", async (req, res) => {
    console.log("🔔 Received blast data:", req.body);
    
    const {
        mine,
        date,
        time,
        blastLocation,
        noOfHoles,
        burden,
        spacing,
        depth,
        chargePerHole,
        rowDelay,
        holeDelay,
        Distance,
        ppv,
        SD,
        PPV_vs_SD_Equation
    } = req.body;
    
    // Basic validation
    if (!mine || !date || !time || !blastLocation || !noOfHoles) {
        return res.status(400).json({ msg: "🚫 Missing required fields" });
    }
    
    try {
        const newEntry = new BlastEntry({
            mine,
            date,
            time,
            blastLocation,
            noOfHoles,
            burden,
            spacing,
            depth,
            chargePerHole,
            rowDelay,
            holeDelay,
            Distance,
            ppv,
            SD,
            PPV_vs_SD_Equation
        });
        
        await newEntry.save();
        console.log("✅ Blast data saved:", newEntry);
        res.status(201).json({ msg: "✅ Blast data stored successfully" });
    } catch (err) {
        console.error("❌ Error saving blast data:", err);
        res.status(500).json({ msg: "❌ Error storing blast data", error: err.message });
    }
});

module.exports = router;