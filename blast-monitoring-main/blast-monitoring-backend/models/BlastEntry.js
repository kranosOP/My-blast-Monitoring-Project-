const mongoose = require("mongoose");

const BlastEntrySchema = new mongoose.Schema({
    mine: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    blastLocation: {
        type: String,
        required: true
    },
    noOfHoles: {
        type: Number,
        required: true
    },
    burden: {
        type: Number
    },
    spacing: {
        type: Number
    },
    depth: {
        type: Number
    },
    chargePerHole: {
        type: Number
    },
    rowDelay: {
        type: Number
    },
    holeDelay: {
        type: Number
    },
    Distance: {
        type: Number
    },
    ppv: {
        type: Number
    },
    SD: {
        type: Number
    },
    PPV_vs_SD_Equation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("BlastEntry", BlastEntrySchema);