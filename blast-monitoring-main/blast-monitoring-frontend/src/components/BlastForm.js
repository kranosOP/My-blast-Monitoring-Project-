import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";  
import blastingImage from "../assets/blasting.jpeg";  

const BlastForm = () => {
    const [formData, setFormData] = useState({
        Depth: "",
        Burden: "",
        Spacing: "",
        Stemming: "",
        "Total charge length": "",
        "Explosive per hole": "",
        "Maximum charge weight per delay (kg)": "",
        "Total amount of explosive (kg)": "",
        "Total rock blasted (tonnes)": "",
        "Powder factor (ton/kg)": "",
        "Distance (m)": "",
        SD: "",
        Frequency: "",
    });

    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle Form Submission (Send Data to Backend)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPrediction(null);

        try {
            const response = await axios.post("http://localhost:5001/predict", formData);
            setPrediction(response.data);
        } catch (err) {
            setError("Prediction failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            className="container-fluid d-flex align-items-center justify-content-center min-vh-100 position-relative"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
            style={{
                backgroundImage: `url(${blastingImage})`,  
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
            }}
        >
            {/* ✅ Semi-transparent Overlay for Readability */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            {/* ✅ Form Container */}
            <motion.div 
                className="bg-white p-5 rounded shadow-lg position-relative w-50"
                style={{ zIndex: 2, maxWidth: "700px" }}
                initial={{ opacity: 0, scale: 0.8 }}  
                animate={{ opacity: 1, scale: 1 }}  
                transition={{ duration: 0.5 }}  
            >
                <h2 className="text-center fw-bold mb-4">Blast Damage Prediction</h2>
                <form onSubmit={handleSubmit}>

                    {/* ✅ Form Inputs */}
                    <div className="row g-3">
                        {Object.keys(formData).map((key, index) => (
                            <div key={index} className="col-md-6">
                                <input 
                                    type="number" 
                                    name={key} 
                                    placeholder={key} 
                                    value={formData[key]}
                                    onChange={handleChange} 
                                    required 
                                    className="form-control p-3"
                                />
                            </div>
                        ))}
                    </div>

                    {/* ✅ Submit Button */}
                    <motion.button 
                        type="submit"
                        className="btn btn-success w-100 fw-bold mt-4 p-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        {loading ? "Predicting..." : "Predict Damage"}
                    </motion.button>
                </form>

                {/* ✅ Display Prediction Results */}
                {prediction && (
                    <div className="alert alert-success mt-4 text-center">
                        <h4>Predicted PPV: {prediction.PPV}</h4>
                        <h5>Damage Level: {prediction["Damage Level"]}</h5>
                    </div>
                )}

                {error && <div className="alert alert-danger mt-4">{error}</div>}
            </motion.div>
        </motion.div>
    );
};

export default BlastForm;
