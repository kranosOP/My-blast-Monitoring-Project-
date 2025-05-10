const mongoose = require("mongoose");

const blastSchema = new mongoose.Schema({
  date: String,
  time: String,
  blastLocation: String,
  noOfHoles: Number,
  burden: Number,
  spacing: Number,
  depth: Number,
  chargePerHole: Number,
  rowDelay: Number,
  holeDelay: Number,
  Distance: Number,
  ppv: Number,
  SD: Number,
  PPV: Number,
  PPV_vs_SD_Equation: String,
}, { timestamps: true });

const mineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  blastData: [blastSchema], 
});

const Mine = mongoose.models.Mine || mongoose.model("Mine", mineSchema);
module.exports = Mine;

