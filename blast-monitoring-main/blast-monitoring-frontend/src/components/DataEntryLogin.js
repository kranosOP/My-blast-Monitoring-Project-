import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import blastingImage from "../assets/blasting.jpeg";  

const DataEntryLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const selectedMine = localStorage.getItem("selectedMine") || "Unknown Mine";  


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const allowedDomains = [
            "blast-jayant.ac.in",
            "blast-khadia.ac.in",
            "blast-bina.ac.in"
        ];
    
        const emailDomain = email.split("@")[1];
    
        if (allowedDomains.includes(emailDomain) && password === "1234") {
            try {
                const response = await fetch("http://localhost:5000/api/dataentry/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email })
                });
    
                const data = await response.json();
                if (!response.ok) {
                    alert(data.msg || "Error storing email.");
                    return;
                }
    
                // Navigate to form after successful save
                navigate("/data-entry-form");
            } catch (err) {
                console.error("Error:", err);
                alert("Failed to save email.");
            }
        } else {
            alert("Invalid Credentials! Use an authorized mine email.");
        }
    };
    

    return (
        <motion.div 
            className="container-fluid d-flex align-items-center justify-content-center min-vh-100 position-relative"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
        >
            {/* Full-Screen Background Image */}
            <div className="position-absolute top-0 start-0 w-100 h-100">
                <img src={blastingImage} alt="Blasting" className="w-100 h-100 object-fit-cover"/>
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
            </div>

            {/* Main Login Container */}
            <div className="row w-75 position-relative" style={{ zIndex: 2 }}>
                {/* Left Section: Mine Information */}
                <div className="col-md-6 d-flex flex-column justify-content-center text-light p-5">
                    <h1 className="fw-bold">{selectedMine} - Data Entry</h1>
                    <p className="fs-5">
                        Enter blast data for <strong>{selectedMine}</strong> to monitor and analyze its environmental and structural impact. 
                        Ensure accurate records for better damage predictions and safety compliance.
                    </p>
                    <ul className="list-unstyled fs-5" style={{ lineHeight: "1.8" }}>
                        <li>✓ Secure Mine-Specific Login 🔐</li>
                        <li>✓ Accurate Blast Data Recording 📊</li>
                        <li>✓ Environmental & Structural Analysis 🏗️</li>
                        <li>✓ Compliance & Safety Monitoring ⚠️</li>
                    </ul>
                </div>

                {/* Right Section: Login Form */}
                <motion.div 
                    className="col-md-6 bg-white p-4 rounded shadow-lg"
                    style={{ maxWidth: "400px", margin: "auto" }}
                    initial={{ opacity: 0, scale: 0.8 }}  
                    animate={{ opacity: 1, scale: 1 }}  
                    transition={{ duration: 0.5 }}  
                >
                    <h2 className="text-center mb-3 fw-bold">🔑 Data Entry Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email (e.g. user@blast-minename.ac.in)" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control mb-3"
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="form-control mb-3"
                            required
                        />
                        <motion.button 
                            type="submit"
                            className="btn btn-success w-100 fw-bold"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Login
                            <p className="text-muted text-center mt-2" style={{ fontSize: "0.9rem" }}>
                        📥 Your email will be securely stored in our database upon login.
                            </p>
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DataEntryLogin;
