import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import MineBlastTrends from "./MineBlastTrends";
import { Carousel } from "react-bootstrap";
import jayantaImage from "../assets/jayanta.jpg";
import khadiaImage from "../assets/khadia.jpg";
import beenaImage from "../assets/beena.jpg";
import blast1 from "../assets/blast1.jpg";
import blast2 from "../assets/blast2.jpg";
import blast3 from "../assets/blast3.jpg";
import blast4 from "../assets/blast4.jpg";
import blast5 from "../assets/blast5.jpg";

const minesData = [
    {
        name: "Jayant OCP",
        img: jayantaImage,
        info: ["Located in Singrauli", "Annual production: 15 MT", "Depth: 150m", "Bench height: 12m"],
    },
    {
        name: "Khadia OCP",
        img: khadiaImage,
        info: ["Operated by NCL", "Annual production: 18 MT", "Depth: 170m", "Bench height: 10m"],
    },
    {
        name: "Bina OCP",
        img: beenaImage,
        info: ["Largest mine in region", "Annual production: 20 MT", "Depth: 200m", "Bench height: 15m"],
    },
];

const newsData = [
    { img: blast1, headline: "Major Blast in Jayant OCP: Safety Precautions Taken" },
    { img: blast2, headline: "Khadia OCP Achieves New Production Record" },
    { img: blast3, headline: "Bina OCP Implements Advanced Blasting Techniques" },
    { img: blast4, headline: "Environmental Impact of Recent Blasting Operations" },
    { img: blast5, headline: "Blast Monitoring System Upgraded for Better Accuracy" },
];

const Dashboard = () => {
    return (
        <motion.div 
            className="container-fluid p-0 m-0"
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            transition={{ duration: 0.01 }}  
            style={{ width: "100vw", height: "100vh", overflowX: "hidden" }}
        >
            {/* 🚀 Blasting News Carousel Section (Full Width) */}
            <Carousel className="mb-4 w-100" style={{ height: "50vh" }}>
                {newsData.map((news, index) => (
                    <Carousel.Item key={index} interval={3000}>
                        <img 
                            src={news.img} 
                            className="d-block w-100" 
                            alt="Blasting News" 
                            style={{ height: "50vh", objectFit: "cover" }} 
                        />
                        <Carousel.Caption>
                            <h3 className="bg-dark text-white p-2 rounded">{news.headline}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* 🚀 Animated Statistics Section */}
            <div className="container-fluid bg-dark text-white py-5 text-center">
                <div className="row">
                    <div className="col-md-4">
                        <h2>Efficiency</h2>
                        <h3><CountUp start={0} end={92.5} duration={3} decimals={1} suffix="%" /></h3>
                    </div>
                    <div className="col-md-4">
                        <h2>Blasts Per Day</h2>
                        <h3><CountUp start={0} end={35} duration={3} /></h3>
                    </div>
                    <div className="col-md-4">
                        <h2>Safety Score</h2>
                        <h3><CountUp start={0} end={98.7} duration={3} decimals={1} suffix="%" /></h3>
                    </div>
                </div>
            </div>

            {/* 🚀 Mines Section (Full Width & Occupying Remaining Screen) */}
            <div className="d-flex flex-wrap w-100" style={{ minHeight: "50vh" }}>
                {minesData.map((mine, index) => (
                    <div key={index} className="col-md-4 p-0">
                        <div className="card border-0 h-100 d-flex flex-column">
                            {/* Mine Image */}
                            <img 
                                src={mine.img} 
                                className="card-img-top w-100" 
                                alt={mine.name} 
                                style={{ objectFit: "cover", height: "200px" }}
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                {/* Mine Name */}
                                <h5 className="card-title fw-bold text-center">{mine.name}</h5>
                                
                                {/* Short Info */}
                                <ul className="list-group list-group-flush">
                                    {mine.info.map((point, idx) => (
                                        <li key={idx} className="list-group-item">{point}</li>
                                    ))}
                                </ul>

                                {/* Blast Trends Graph (Graph ab properly dikhega) */}
                                <div className="mt-3">
                                    <MineBlastTrends mine={mine.name} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Dashboard;
