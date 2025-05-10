import React, { useEffect, useRef, useState, useMemo } from "react";
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
import "../index.css";  
import blastingImage from "../assets/blasting.jpeg";  

// ✅ Register Chart.js Components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// ✅ Sample Data (Will be Replaced with API Data)
const sampleData = [
    { month: "Jan", ppv: 2.5, damageLevel: "Slight Damage" },
    { month: "Feb", ppv: 6.8, damageLevel: "Moderate Damage" }, 
    { month: "Mar", ppv: 1.2, damageLevel: "No Damage" },
    { month: "Apr", ppv: 10.5, damageLevel: "Severe Damage" },
    { month: "May", ppv: 4.3, damageLevel: "Slight Damage" },
];

// ✅ Results Component
const Results = ({ data = sampleData }) => {
    const chartRef = useRef(null);
    const [chartHeight, setChartHeight] = useState(400);

    // ✅ Adjust Chart Height Dynamically
    useEffect(() => {
        if (chartRef.current) {
            setChartHeight(chartRef.current.clientWidth * 0.6);
        }
    }, []);

    // ✅ Convert Data for Chart.js
    const chartData = useMemo(() => ({
        labels: data.map(entry => entry.month),
        datasets: [
            {
                label: "PPV (mm/s)",
                data: data.map(entry => entry.ppv),
                borderColor: "#ff5733",
                backgroundColor: "rgba(255, 87, 51, 0.2)",
                borderWidth: 2,
                pointRadius: 6,
                pointBackgroundColor: data.map(entry =>
                    entry.damageLevel === "No Damage" ? "#28a745" :
                    entry.damageLevel === "Slight Damage" ? "#ffc107" :
                    entry.damageLevel === "Moderate Damage" ? "#fd7e14" :
                    "#dc3545"
                ),
                tension: 0.4,
            },
        ],
    }), [data]);

    // ✅ Chart Options
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: { display: true, position: "top" },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        let index = tooltipItem.dataIndex;
                        return `PPV: ${data[index].ppv} mm/s, ${data[index].damageLevel}`;
                    }
                }
            }
        },
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
                backdropFilter: "blur(5px)",  // ✅ Added Blur Effect
            }}
        >
            {/* ✅ Semi-transparent Overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            {/* ✅ Results Container */}
            <motion.div 
                className="container position-relative text-center text-white"
                style={{ zIndex: 2 }}
            >
                <h2 className="fw-bold mb-4">📊 PPV & Damage Level Trends</h2>

                {/* ✅ PPV Graph */}
                <div ref={chartRef} className="card shadow-lg p-4 w-75 mx-auto bg-light">
                    <h5 className="text-center text-dark">Blast-Induced PPV Trends</h5>
                    <div style={{ height: `${chartHeight}px` }}>  
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                {/* ✅ PPV Summary Table */}
                <div className="card shadow-lg p-4 w-75 mx-auto bg-white mt-4">
                    <h5 className="text-center mb-3">PPV Summary for Selected Mine</h5>
                    <table className="table table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Month</th>
                                <th>PPV (mm/s)</th>
                                <th>Damage Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((entry, index) => (
                                <tr key={index}>
                                    <td>{entry.month}</td>
                                    <td>{entry.ppv.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${
                                            entry.damageLevel === "No Damage" ? "bg-success" :
                                            entry.damageLevel === "Slight Damage" ? "bg-warning" :
                                            entry.damageLevel === "Moderate Damage" ? "bg-orange" :
                                            "bg-danger"
                                        }`}>
                                            {entry.damageLevel}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Results;

