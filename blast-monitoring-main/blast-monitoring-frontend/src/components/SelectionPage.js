import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTachometerAlt, FaChartLine, FaDatabase } from "react-icons/fa";
import "../index.css";
import blastingImage from "../assets/blasting.jpeg";

const SelectionPage = () => {
    const navigate = useNavigate();

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

            {/* Main Content Container */}
            <div className="row w-75 position-relative text-light" style={{ zIndex: 2 }}>
                {/* Left Section: Information */}
                <div className="col-md-6 d-flex flex-column justify-content-center p-5">
                    <h1 className="fw-bold">Blast Monitoring System</h1>
                    <p className="fs-5">
                        Welcome to the <strong>Blast Monitoring System </strong>, your all-in-one solution for 
                        <strong> real-time blast analysis, damage prediction, and data management.</strong> 
                        
                    </p>
                    <p className="fs-5">Ensure safe and optimized mining operations with our smart monitoring system. Select an option to get started! 🚀</p>
                </div>

                {/* Right Section: Selection Options */}
                <motion.div 
                    className="col-md-6 bg-white p-4 rounded shadow-lg"
                    style={{ maxWidth: "400px", margin: "auto" }}
                    initial={{ opacity: 0, scale: 0.8 }}  
                    animate={{ opacity: 1, scale: 1 }}  
                    transition={{ duration: 0.5 }}  
                >
                    <h2 className="fw-bold mb-4 text-primary text-center"> Select an Option </h2>
                    
                    {/* Dashboard */}
                    <motion.button 
                        className="btn btn-primary w-100 mb-3 fw-semibold py-2 rounded-pill d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.07, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/dashboard")}
                    >
                        <FaTachometerAlt className="me-2" /> Open Dashboard
                    </motion.button>

                    {/* Damage Prediction */}
                    <motion.button 
                        className="btn btn-success w-100 mb-3 fw-semibold py-2 rounded-pill d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.07, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/damage-prediction")}
                    >
                        <FaChartLine className="me-2" /> Damage Prediction
                    </motion.button>

                    {/* Data Entry */}
                    <motion.button 
                        className="btn btn-warning w-100 fw-semibold py-2 rounded-pill d-flex align-items-center justify-content-center"
                        whileHover={{ scale: 1.07, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/mine-selection")}
                    >
                        <FaDatabase className="me-2" /> Data Entry
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SelectionPage;
