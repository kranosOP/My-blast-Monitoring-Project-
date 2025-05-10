import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";  
import IntroPage from "./components/IntroPage";  
import Login from "./components/Login";
import SelectionPage from "./components/SelectionPage";
import Dashboard from "./components/Dashboard";  
import DamagePredictionDashboard from "./components/DamagePredictionDashboard";  
import BlastForm from "./components/BlastForm";
import Results from "./components/Results";
import MineSelection from "./components/MineSelection";
import DataEntryLogin from "./components/DataEntryLogin";
import DataEntry from "./components/DataEntry"; 
import MiningPartners from "./components/MiningPartners";  
import ContactForm from "./components/ContactForm";  
import "bootstrap/dist/css/bootstrap.min.css";


const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">  
            <motion.div
                key={location.pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
            >
                <Routes location={location} key={location.pathname}>

                    {/* 🆕 Intro Page (Default Landing Page) */}
                    <Route path="/" element={<IntroPage />} />

                    {/* 🔐 LOGIN & SELECTION PAGE */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/selection" element={<SelectionPage />} />

                    {/* 🚀 DASHBOARD & DAMAGE PREDICTION */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/damage-prediction" element={<DamagePredictionDashboard />} />
                    <Route path="/blast-form" element={<BlastForm />} />
                    <Route path="/results" element={<Results />} />

                    {/* 🛠️ DATA ENTRY FLOW */}
                    <Route path="/mine-selection" element={<MineSelection />} />
                    <Route path="/data-entry-login" element={<DataEntryLogin />} />
                    <Route path="/data-entry-form" element={<DataEntry />} />

                    {/* 🏭 MINING PARTNERS PAGE */}
                    <Route path="/mining-partners" element={<MiningPartners />} />  

                    {/* 📩 CONTACT FORM PAGE */}
                    <Route path="/contact" element={<ContactForm />} />  {/* ✅ Added ContactForm route */}
                    
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default App;
