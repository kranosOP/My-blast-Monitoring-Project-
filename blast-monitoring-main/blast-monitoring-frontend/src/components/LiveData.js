import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Sample data for Blast Trends
const sampleData = [
    { month: "Jan", blastCount: 5 },
    { month: "Feb", blastCount: 8 },
    { month: "Mar", blastCount: 6 },
    { month: "Apr", blastCount: 10 },
    { month: "May", blastCount: 12 },
];

// Convert data into chart format
const chartData = {
    labels: sampleData.map(entry => entry.month),
    datasets: [
        {
            label: "Blast Frequency",
            data: sampleData.map(entry => entry.blastCount),
            borderColor: "#007bff",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            borderWidth: 2,
            pointRadius: 6,
            pointBackgroundColor: "#007bff",
            tension: 0.4,
        },
    ],
};

// Chart options
const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: true, position: "top" },
    },
};

const LiveData = () => {
    return (
        <motion.div 
            className="card shadow-lg p-4 mt-3 text-center bg-white"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.5 }}  
        >
            <h5 className="text-center text-primary fw-bold">📊 Live Blast Frequency Trends</h5>
            <Line data={chartData} options={chartOptions} />
        </motion.div>
    );
};

export default LiveData;

