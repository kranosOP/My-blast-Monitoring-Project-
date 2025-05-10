import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import blastingImage from "../assets/blasting.jpeg";
import axios from "axios"; // Import axios for HTTP requests

const DataEntry = () => {
    const navigate = useNavigate();
    const selectedMine = localStorage.getItem("selectedMine") || "No Mine Selected";

    useEffect(() => {
        if (selectedMine === "No Mine Selected") {
            alert("Please select a mine first!");
            navigate("/mine-selection");
        }
        fetchBlastData(); // Fetch blast data from the backend
    }, [selectedMine, navigate]);

    const [formData, setFormData] = useState({
        date: "",
        time: "",
        blastLocation: "",
        noOfHoles: "",
        burden: "",
        spacing: "",
        depth: "",
        chargePerHole: "",
        rowDelay: "",
        holeDelay: "",
        Distance: "",
    });

    const [blastRecords, setBlastRecords] = useState([]);

// Fetch blast data from MongoDB via your backend
const fetchBlastData = async () => {
    try {
        // Updated endpoint to match the backend route
        const response = await axios.get("http://localhost:5000/api/blasts/all");
        console.log("Fetched data:", response.data);
        
        // Check if response.data is an array before setting state
        if (Array.isArray(response.data)) {
            setBlastRecords(response.data); // Set the blast records directly
        } else if (Array.isArray(response.data.data)) {
            setBlastRecords(response.data.data); // If data is wrapped in a data property
        } else {
            console.error("Invalid data format received:", response.data);
            setBlastRecords([]); // Initialize as empty array on error
        }
    } catch (error) {
        console.error("Error fetching blast data:", error);
        setBlastRecords([]); // Initialize as empty array on error
    }
};

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculatePPV = (SD) => {
        // Replace with actual formula for PPV
        return SD * 0.5; // Placeholder formula, adjust as needed
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate Scaled Distance (SD = Distance / √Charge)
        const distance = parseFloat(formData.Distance);
        const chargePerHole = parseFloat(formData.chargePerHole);
        let SD = 0;
        if (!isNaN(distance) && !isNaN(chargePerHole) && chargePerHole !== 0) {
            SD = distance / Math.sqrt(chargePerHole);
        }

        // Calculate PPV (Placeholder calculation)
        const PPV = calculatePPV(SD);

        try {
            console.log("Submitting data to backend:", {
                mine: selectedMine,
                ...formData,
                SD: SD.toFixed(2),
                ppv: PPV.toFixed(2),
                PPV_vs_SD_Equation: `PPV = some_formula_based_on_SD_${SD.toFixed(2)}`,
            });
            
            // Send POST request to store data in MongoDB - FIXED: Changed payload structure to match backend
            const response = await axios.post("http://localhost:5000/api/blasts/add", {
                mine: selectedMine,
                ...formData, // Spread all form fields directly
                SD: SD.toFixed(2),
                ppv: PPV.toFixed(2),
                PPV_vs_SD_Equation: `PPV = some_formula_based_on_SD_${SD.toFixed(2)}`,
            });

            console.log("Server response:", response.data);
            
            alert(`Blast data for ${selectedMine} recorded successfully!`);
            
            // Reset form
            setFormData({
                date: "",
                time: "",
                blastLocation: "",
                noOfHoles: "",
                burden: "",
                spacing: "",
                depth: "",
                chargePerHole: "",
                rowDelay: "",
                holeDelay: "",
                Distance: "",
            });
            
            fetchBlastData(); // Refresh the list of blast records after submission
        } catch (error) {
            console.error("Error storing blast data:", error);
            alert("Failed to store data. Please try again.");
        }
    };

    const handleDelete = async (id) => {
        try {
            // Send DELETE request to remove blast entry from MongoDB
            await axios.delete(`http://localhost:5000/api/blasts/${id}`);
            alert("Blast entry deleted successfully!");
            // Update the blast records state by filtering out the deleted record
            setBlastRecords(blastRecords.filter((record) => record._id !== id)); // Using _id for filtering
        } catch (error) {
            console.error("Error deleting blast entry:", error);
            alert("Failed to delete entry. Please try again.");
        }
    };

    return (
        <motion.div
            className="d-flex align-items-center justify-content-center min-vh-100 position-relative"
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
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            <motion.div
                className="bg-white p-5 rounded shadow-lg position-relative text-center"
                style={{ width: "600px", zIndex: 2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="fw-bold mb-3">Blast Data Entry</h2>
                <p className="text-muted">Recording blast details for <strong>{selectedMine}</strong></p>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        {[ // Form inputs array
                            { name: "date", placeholder: "Date", type: "date" },
                            { name: "time", placeholder: "Time", type: "time" },
                            { name: "blastLocation", placeholder: "Blast Location" },
                            { name: "noOfHoles", placeholder: "No. of Holes" },
                            { name: "burden", placeholder: "Burden (m)" },
                            { name: "spacing", placeholder: "Spacing (m)" },
                            { name: "depth", placeholder: "Depth (m)" },
                            { name: "chargePerHole", placeholder: "Charge per Hole (kg)" },
                            { name: "rowDelay", placeholder: "Row to Row Delay (ms)" },
                            { name: "holeDelay", placeholder: "Hole to Hole Delay (ms)" },
                            { name: "Distance", placeholder: "Distance (m)" },
                        ].map((input, index) => (
                            <div key={index} className="col-md-6">
                                <input
                                    type={input.type || "text"}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    value={formData[input.name]}
                                    onChange={handleChange}
                                    required
                                    className="form-control p-3"
                                />
                            </div>
                        ))}
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-success w-100 fw-bold mt-4 p-3"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Submit Data
                    </motion.button>
                </form>

                <div className="mt-4 text-start">
                    <h5 className="fw-bold text-center">Stored Blast Records</h5>
                    <ul className="list-group" style={{maxHeight: "200px", overflowY: "auto"}}>
                        {blastRecords.length === 0 ? (
                            <p className="text-muted text-center">No blast data recorded yet.</p>
                        ) : (
                            blastRecords.map((record) => (
                                <li key={record._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{record.mine}</strong> - {record.date} - {record.blastLocation}
                                    </div>
                                    <motion.button
                                        onClick={() => handleDelete(record._id)} // Using _id for deletion
                                        className="btn btn-danger btn-sm"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        ❌ Delete
                                    </motion.button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DataEntry;

