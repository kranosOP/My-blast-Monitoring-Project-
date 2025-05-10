import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";  
import "../index.css";  
import jayantaImage from "../assets/jayanta.jpg";
import khadiaImage from "../assets/khadia.jpg";
import beenaImage from "../assets/beena.jpg";
import blastingImage from "../assets/blasting.jpeg"; 

const MineSelection = () => {
    const navigate = useNavigate();
    const [customMine, setCustomMine] = useState("");

    const mines = [
        { name: "Jayant OCP", img: jayantaImage },
        { name: "Khadia OCP", img: khadiaImage },
        { name: "Bina OCP", img: beenaImage },
    ];

    const handleMineSelect = (mine) => {
        localStorage.setItem("selectedMine", mine.name);
        navigate("/data-entry-login");
    };

    const handleCustomMineSubmit = () => {
        if (customMine.trim()) {
            localStorage.setItem("selectedMine", customMine);
            navigate("/data-entry-login");
        } else {
            alert("Please enter a mine name.");
        }
    };

    return (
        <motion.div 
            className="mine-selection-container d-flex flex-column align-items-center justify-content-center position-relative"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
            style={{
                backgroundImage: `url(${blastingImage})`,  // ✅ Set Background Image Here
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
            {/* Main Content */}
            <div className="position-relative text-center text-white" style={{ zIndex: 2 }}>
                <h2 className="fw-bold mb-4">Select a Mine for Data Entry</h2>

                {/* Mines Displayed in a Responsive Grid */}
                <div className="row row-cols-1 row-cols-md-3 g-4 w-100">
                    {mines.map((mine, index) => (
                        <motion.div 
                            key={index} 
                            className="col d-flex justify-content-center"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="card shadow-lg border-0 bg-light" style={{ width: "18rem" }}>
                                <img src={mine.img} className="card-img-top" alt={mine.name} />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{mine.name}</h5>
                                    <motion.button 
                                        onClick={() => handleMineSelect(mine)}
                                        className="btn btn-success w-100 fw-bold"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Select Mine
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Custom Mine Entry */}
                <div className="mt-4 w-50 text-center">
                    <h3 className="fw-bold mb-3">Add Any Other Mine</h3>
                    <input 
                        type="text" 
                        placeholder="Enter mine name" 
                        value={customMine} 
                        onChange={(e) => setCustomMine(e.target.value)}
                        className="form-control mb-3"
                    />
                    <motion.button 
                        onClick={handleCustomMineSubmit} 
                        className="btn btn-warning w-100 fw-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default MineSelection;
