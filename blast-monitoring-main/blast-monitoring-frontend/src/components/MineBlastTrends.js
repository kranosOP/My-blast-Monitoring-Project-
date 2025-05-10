import React, { useState, useEffect } from "react";
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

// Register Chart.js Components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MineBlastTrends = ({ mine }) => {
    const initialData = {
        "Jayanta OCP": [2.1, 3.5, 4.2, 5.8, 6.3, 7.1, 6.5, 5.9, 6.7, 7.5],
        "Khadia OCP": [1.8, 3.2, 4.5, 5.0, 5.7, 6.0, 5.5, 5.2, 6.1, 6.8],
        "Beena OCP": [2.5, 3.8, 4.6, 6.0, 6.8, 7.3, 6.9, 6.2, 7.0, 7.6]
    };

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

    const [chartData, setChartData] = useState({
        labels: months,
        datasets: [
            {
                label: "PPV (mm/s)",
                data: initialData[mine],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.2)",
                borderWidth: 2,
                pointRadius: 5,
                tension: 0.4,
            },
        ],
    });

    // Live Data Update Every 5 Seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setChartData((prevData) => {
                const newData = [...prevData.datasets[0].data];
                newData.shift();  // Remove first value
                newData.push((Math.random() * (8 - 2) + 2).toFixed(1)); // Add new random value
                
                return {
                    ...prevData,
                    datasets: [{ ...prevData.datasets[0], data: newData }]
                };
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card shadow-sm p-3 mt-3" style={{ width: "100%", height: "300px" }}>
            <h5 className="text-center">{mine} - Live Blast Trends</h5>
            <div style={{ height: "250px" }}>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default MineBlastTrends;
