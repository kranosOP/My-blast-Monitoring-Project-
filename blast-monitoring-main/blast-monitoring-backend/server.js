const express = require("express");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Log startup information
console.log("Starting server with Node.js version:", process.version);
console.log("Current working directory:", process.cwd());

// Load environment variables with error handling
try {
    require("dotenv").config();
    console.log("Environment variables loaded");
    // Log keys (but not values) to verify they exist
    console.log("Available env vars:", Object.keys(process.env).filter(key => 
        key.startsWith("MONGO_") || 
        key.startsWith("GOOGLE_") || 
        key.startsWith("SESSION_")
    ));
} catch (err) {
    console.error("Error loading .env file:", err);
}

const app = express();

// ===== Middleware with error handling =====
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// Check if SESSION_SECRET is defined
if (!process.env.SESSION_SECRET) {
    console.warn("⚠️ SESSION_SECRET not defined in environment, using fallback");
}

app.use(session({
    secret: process.env.SESSION_SECRET || "fallback-secret-key-for-development",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// ===== MongoDB Connection with better error handling =====
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("❌ MONGO_URI not defined in environment variables");
}

console.log("Attempting MongoDB connection...");
mongoose.connect(mongoUri || "mongodb://localhost:27017/mines-blast-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    console.error("MongoDB connection string (redacted):", 
        mongoUri ? `${mongoUri.substring(0, 10)}...` : "undefined");
});

// ===== Models setup =====
// Ensure models directory exists
const modelsDir = path.join(__dirname, "models");
if (!fs.existsSync(modelsDir)) {
    fs.mkdirSync(modelsDir, { recursive: true });
    console.log("Created models directory");
}

// Ensure routes directory exists
const routesDir = path.join(__dirname, "routes");
if (!fs.existsSync(routesDir)) {
    fs.mkdirSync(routesDir, { recursive: true });
    console.log("Created routes directory");
}

// Check if User model file exists
const userModelPath = path.join(modelsDir, "User.js");
if (!fs.existsSync(userModelPath)) {
    console.log("Creating User model file...");
    fs.writeFileSync(userModelPath, `
    const mongoose = require("mongoose");
    
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    });
    
    module.exports = mongoose.model("User", UserSchema);
    `);
}

// Check if BlastEntry model file exists
const blastModelPath = path.join(modelsDir, "BlastEntry.js");
if (!fs.existsSync(blastModelPath)) {
    console.log("Creating BlastEntry model file...");
    fs.writeFileSync(blastModelPath, `
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
    `);
}

// ===== Google Auth Setup with better error handling =====
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl = process.env.GOOGLE_CALLBACK_URL;

if (!googleClientId || !googleClientSecret || !googleCallbackUrl) {
    console.warn("⚠️ Google OAuth credentials incomplete:", {
        clientId: googleClientId ? "defined" : "missing",
        clientSecret: googleClientSecret ? "defined" : "missing",
        callbackUrl: googleCallbackUrl ? "defined" : "missing"
    });
}

try {
    passport.use("google-default", new GoogleStrategy({
        clientID: googleClientId || "dummy-id",
        clientSecret: googleClientSecret || "dummy-secret",
        callbackURL: googleCallbackUrl || "http://localhost:5000/auth/google/callback"
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));
    console.log("Google OAuth strategy configured");
} catch (err) {
    console.error("❌ Error setting up Google OAuth:", err);
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// ===== Google Auth Endpoints =====
app.get("/auth/google",
    passport.authenticate("google-default", { scope: ["profile", "email"] }));

app.get("/auth/google/callback",
    passport.authenticate("google-default", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("http://localhost:3000/selection");
    });

// ===== Import Routes =====
// Blast routes
let blastRoutes;
try {
    blastRoutes = require("./routes/blast");
    console.log("Blast routes imported successfully");
} catch (err) {
    console.error("❌ Error importing blast routes:", err);
    // Create routes file if it doesn't exist
    const blastRoutesPath = path.join(routesDir, "blast.js");
    
    fs.writeFileSync(blastRoutesPath, `
    const express = require("express");
    const router = express.Router();
    const BlastEntry = require("../models/BlastEntry");
    
    router.get("/", (req, res) => {
        res.json({ msg: "Blast routes working" });
    });
    
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
            res.status(500).json({ msg: "❌ Error storing blast data" });
        }
    });
    
    module.exports = router;
    `);
    
    // Try importing again
    try {
        blastRoutes = require("./routes/blast");
        console.log("Created and imported blast routes successfully");
    } catch (secondErr) {
        console.error("❌❌ Still couldn't import blast routes:", secondErr);
        // Create dummy router if import still fails
        blastRoutes = express.Router();
        blastRoutes.get("/", (req, res) => res.json({ msg: "Fallback blast route" }));
    }
}

// Data Entry User model
let DataEntryUser;
try {
    DataEntryUser = require("./models/User");
    console.log("User model imported successfully");
} catch (err) {
    console.error("❌ Error importing User model:", err);
    // Create dummy model if import fails
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        email: { type: String, required: true, unique: true }
    });
    DataEntryUser = mongoose.model("User", UserSchema);
}

// ===== Routes =====
// Data entry endpoint
app.post("/api/dataentry/register", async (req, res) => {
    console.log("dataentry/register endpoint called");
    const { email } = req.body;
    console.log("Received email:", email);
    
    if (!email) {
        console.log("Email missing in request");
        return res.status(400).json({ msg: "Email is required" });
    }
    
    try {
        const exists = await DataEntryUser.findOne({ email });
        if (exists) {
            console.log("Email already exists:", email);
            return res.status(200).json({ msg: "Already exists" });
        }
        
        console.log("Saving new email:", email);
        await new DataEntryUser({ email }).save();
        console.log("Email saved successfully");
        res.status(201).json({ msg: "Email stored successfully" });
    } catch (err) {
        console.error("Error storing email:", err);
        res.status(500).json({ msg: "Server error" });
    }
});

// Blast routes with debug logging
app.use("/api/blasts", (req, res, next) => {
    console.log("🔍 Blast API request received:", req.method, req.url);
    console.log("Request body:", req.body);
    next();
}, blastRoutes);

// ===== Health Check =====
app.get("/", (req, res) => {
    res.send("Server is running ✅");
});

// ===== Improved Global Error Handler =====
app.use((err, req, res, next) => {
    console.error("Global error handler caught:");
    console.error(err.stack);
    res.status(500).json({ 
        msg: "Internal server error", 
        error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message 
    });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("Routes configured:");
    console.log("- GET /");
    console.log("- GET /auth/google");
    console.log("- GET /auth/google/callback");
    console.log("- POST /api/dataentry/register");
    console.log("- POST /api/blasts/add");
    console.log("- GET /api/blasts/all");
});