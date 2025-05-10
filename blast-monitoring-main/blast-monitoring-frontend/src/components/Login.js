import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import blastingImage from "../assets/blasting.jpeg";
//import { auth, signInWithGoogle } from "../firebase";  // Firebase Auth
//import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import googleLogo from "../assets/google-logo.png"; // Google Logo


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

   

    // ✅ Google Sign-In Function
    const handleGoogleSignIn = async () => {
        window.location.href = "http://localhost:5000/auth/google";
    };

    // ✅ Manual Username & Password Login
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "1234") {
            localStorage.setItem("auth", "true");
            setTimeout(() => navigate("/selection"), 1000);
        } else {
            alert("Invalid Credentials! Try admin / 1234");
        }
    };

    return (
        <motion.div 
            className="container-fluid d-flex align-items-center justify-content-center min-vh-100 position-relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background Image with Overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <img src={blastingImage} alt="Blasting" className="w-100 h-100 object-fit-cover"/>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            </div>

            {/* Main Login Container */}
            <div className="row w-75 position-relative" style={{ zIndex: 2 }}>
                {/* Left Section: Information */}
                <div className="col-md-6 d-flex flex-column justify-content-center text-light p-5">
                    <h1 className="fw-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2.5rem" }}>
                        Blast Monitoring System
                    </h1>
                    <p className="fs-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        A real-time blast monitoring system providing live data trends, incident insights, 
                        and environmental impact analysis. Ensure safe mining operations with advanced monitoring.
                    </p>

                    {/* Features List */}
                    <ul
                        className="list-unstyled fs-5"
                        style={{
                            fontFamily: "'Poppins', sans-serif",
                            lineHeight: "1.8",
                            color: "white",
                        }}
                    >
                        <li>✓ Live Data Trends 📊</li>
                        <li>✓ Incident Insights & Alerts 🚨</li>
                        <li>✓ Damage Prediction System 🏗️</li>
                        <li>✓ Secure Data Entry 🔐</li>
                        <li>✓ Environmental Impact Analysis 🌿</li>
                    </ul>
                </div>

                {/* Right Section: Login Form */}
                <motion.div 
                    className="col-md-6 bg-white p-4 rounded shadow-lg"
                    style={{ maxWidth: "400px", margin: "auto", fontFamily: "'Poppins', sans-serif" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-center mb-3 fw-bold" style={{ fontSize: "1.8rem" }}> Login</h2>

                    {/* Username & Password Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="form-control"
                                required
                            />
                        </div>
                        
                        <div className="mb-3 input-group">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="form-control"
                                required
                            />
                            {/* Password Toggle Icon */}
                            <span 
                                className="input-group-text" 
                                style={{ cursor: "pointer" }} 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "👁" : "🔒"}
                            </span>
                        </div>

                        <motion.button 
                            type="submit"
                            className="btn btn-success w-100 fw-bold"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Login
                        </motion.button>
                    </form>

                    {/* Google Sign-In Button */}
                    <motion.button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-light w-100 fw-bold mt-3 border d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img src={googleLogo} alt="Google Logo" style={{ width: "20px", marginRight: "10px" }} />
                        Sign in with Google
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
