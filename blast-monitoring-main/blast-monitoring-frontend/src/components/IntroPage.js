import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import backgroundVideo from "../assets/blasting.mp4"; 
import videoFile from "../assets/blast-info.mp4"; 
import videoPoster from "../assets/blasting.jpeg";  
import jayantaImage from "../assets/jayanta.jpg";
import khadiaImage from "../assets/khadia.jpg";
import beenaImage from "../assets/beena.jpg";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import contactImage from "../assets/blasting.jpeg";

const IntroPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000);
    }, []);

    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light">
                <div className="spinner-border text-warning" role="status"></div>
                <p className="mt-3">Loading Blast Monitoring System...</p>
            </div>
        );
    }

    return (
        <motion.div
            className="intro-container text-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/*  Full-Screen Background Video */}
            <div className="background-video-container">
                <video className="background-video" autoPlay loop muted>
                    <source src={backgroundVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay">
                    <h1 className="overlay-title">Blast Monitoring System</h1>
                    <p className="overlay-tagline">"Real-time insights for a safer future"</p>
                </div>
            </div>

            {/*  Black Background for Main Sections */}
            <div className="black-bg">
                <div className="container">
                    <div className="row align-items-center text-center text-md-start mt-5">
                        {/*  Left Section - Text Content */}
                        <div className="col-md-6">
                            <motion.h1 
                                className="display-4 fw-bold"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Key Features
                            </motion.h1>

                            <motion.p 
                                className="lead"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                A smart system to <strong>monitor, predict, and analyze</strong> blast-induced impacts in mining areas.
                                Get <strong>real-time data</strong>, damage predictions, and environmental insights at your fingertips! 
                            </motion.p>

                            <motion.ul 
                                className="list-unstyled fw-bold"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <li><span className="text-warning">🚀</span> <strong>Live Data Trends:</strong> Real-time monitoring of blast impacts</li>
                                <li><span className="text-danger">⚠️</span> <strong>Incident Insights:</strong> Alerts & reports on blast damages</li>
                                <li><span className="text-success">📊</span> <strong>Damage Prediction:</strong> Predict structural damage using PPV</li>
                                <li><span className="text-info">🔐</span> <strong>Secure Data Entry:</strong> Store & manage blasting records</li>
                                <li><span className="text-primary">🌱</span> <strong>Environmental Impact:</strong> Analyze surroundings</li>

                            </motion.ul>

                            {/* ✅ Proceed Button */}
                            <motion.button 
                                onClick={() => navigate("/login")}
                                className="btn btn-warning fw-bold px-4 py-2"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Get Started  ➡
                            </motion.button>
                        </div>

                        {/* ✅ Right Section - Video Player */}
                        <div className="col-md-6 d-flex justify-content-center mt-4 mt-md-0">
                            <motion.video 
                                className="w-100 rounded shadow"
                                controls
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster={videoPoster}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <source src={videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </motion.video>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "black", minHeight: "100vh", width: "100vw" }}>
            {/* Mining Partners Section */}
            <section className="container text-center my-5">
                <h2 className="fw-bold mb-4 text-white">Our Mines</h2>
                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card shadow-lg border-0">
                            <img src={jayantaImage} alt="Jayanta Mine" className="card-img-top img-fluid" style={{ height: "300px", objectFit: "cover" }} />
                            <div className="card-body bg-dark text-white">
                                <p className="fw-bold mb-0">Jayant Mine</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-lg border-0">
                            <img src={khadiaImage} alt="Khadia Mine" className="card-img-top img-fluid" style={{ height: "300px", objectFit: "cover" }} />
                            <div className="card-body bg-dark text-white">
                                <p className="fw-bold mb-0">Khadia Mine</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-lg border-0">
                            <img src={beenaImage} alt="Beena Mine" className="card-img-top img-fluid" style={{ height: "300px", objectFit: "cover" }} />
                            <div className="card-body bg-dark text-white">
                                <p className="fw-bold mb-0">Bina Mine</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <Container className="py-5">
                <Row className="justify-content-center">
                    <h2 className="text-center mb-4 text-white"><strong>Want a Demo?</strong></h2>

                    <Col md={6}>
                        <Card className="p-3 shadow-lg" style={{ maxWidth: "500px", margin: "auto" }}>  
                            <Card.Body>
                                <h3 className="mb-3 text-white text-center"><strong>Leave a Message</strong></h3>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="text-black"><strong>Select a Business</strong></Form.Label>
                                                <Form.Control as="select">
                                                    <option>- Select a Business -</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="text-black"><strong>Select Purpose</strong></Form.Label>
                                                <Form.Control as="select">
                                                    <option>- Select Purpose -</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="text-black"><strong>First Name</strong></Form.Label>
                                                <Form.Control type="text" placeholder="First Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-2">
                                                <Form.Label className="text-black"><strong>Last Name</strong></Form.Label>
                                                <Form.Control type="text" placeholder="Last Name" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-2">
                                        <Form.Label className="text-black"><strong>Email</strong></Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email" />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label className="text-black"><strong>Message</strong></Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Write your message" />
                                    </Form.Group>

                                    <Button variant="primary" className="w-100">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="p-3 shadow-lg text-center">
                            <Card.Body>
                                <Image src={contactImage} alt="Contact" width="100%" className="mb-2 rounded" />
                                <h5 className="text-black"><strong>Contact Details</strong></h5>
                                <p><FaEnvelope className="text-danger" /> <strong className="text-black">Email:</strong> kritika.verma.min22@itbhu.ac.in</p>
                                <p><FaPhone className="text-success" /> <strong className="text-black">Phone:</strong> 7983071031</p>
                                <p>
                                    <FaLinkedin className="text-primary" />  
                                    <strong className="text-black"> LinkedIn:</strong> 
                                    <a href="https://www.linkedin.com/in/kritika-verma-8490b8254/" target="_blank" rel="noopener noreferrer" className="text-decoration-none"> kritika-verma</a>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
            </div>
        </motion.div>
    );
};

export default IntroPage;
