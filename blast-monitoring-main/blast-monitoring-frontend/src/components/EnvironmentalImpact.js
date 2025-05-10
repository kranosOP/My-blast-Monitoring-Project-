import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample Environmental Data
const envData = [
    { factor: "Air Pollution", level: "High" },
    { factor: "Noise Pollution", level: "Medium" },
    { factor: "Water Contamination", level: "Low" },
];

const EnvironmentalImpact = () => {
    return (
        <motion.div 
            className="card shadow-lg p-4 mt-3 text-center bg-white"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
        >
            <h5 className="text-center text-success fw-bold">🌿 Environmental Impact of Blasting</h5>
            <table className="table table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Factor</th>
                        <th>Impact Level</th>
                    </tr>
                </thead>
                <tbody>
                    {envData.map((entry, index) => (
                        <tr key={index} className="fw-semibold">
                            <td>{entry.factor}</td>
                            <td>
                                <span className={`badge px-3 py-2 fs-6 ${
                                    entry.level === "Low" ? "bg-success" :
                                    entry.level === "Medium" ? "bg-warning" :
                                    "bg-danger"
                                }`}>
                                    {entry.level}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default EnvironmentalImpact;
