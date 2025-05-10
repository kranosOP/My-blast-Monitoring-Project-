import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample Incident Data
const incidentData = [
    { date: "Feb 20", location: "Jayanta OCP", impact: "Low" },
    { date: "Feb 22", location: "Khadia OCP", impact: "Medium" },
    { date: "Feb 25", location: "Beena OCP", impact: "High" },
];

const Incidents = () => {
    return (
        <motion.div 
            className="card shadow-lg p-4 mt-3 text-center bg-white"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
        >
            <h5 className="text-center text-danger fw-bold">🚨 Recent Blast Incidents</h5>
            <table className="table table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Impact Level</th>
                    </tr>
                </thead>
                <tbody>
                    {incidentData.map((entry, index) => (
                        <tr key={index} className="fw-semibold">
                            <td>{entry.date}</td>
                            <td>{entry.location}</td>
                            <td>
                                <span className={`badge px-3 py-2 fs-6 ${
                                    entry.impact === "Low" ? "bg-success" :
                                    entry.impact === "Medium" ? "bg-warning" :
                                    "bg-danger"
                                }`}>
                                    {entry.impact}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    );
};

export default Incidents;
