import React from "react";
import { Container, Row, Col, Form, Button, Card, Image } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa"; // React Icons
import contactImage from "../assets/blasting.jpeg"; // Apni image ka path daalo

const ContactForm = () => {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          
          {/* Section Heading - White Color */}
          <h2 className="text-center mb-4 text-white"><strong>Want a Demo?</strong></h2>
  
          {/* Left Side - Contact Form */}
          <Col md={6}>
            <Card className="p-3 shadow-lg" style={{ maxWidth: "500px", margin: "auto" }}>  
              <Card.Body>
                <h3 className="mb-3 text-white text-center"><strong>Leave a Message</strong></h3> {/* White Heading */}
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
  
          {/* Right Side - Contact Details with Image */}
          <Col md={4}>
            <Card className="p-3 shadow-lg text-center">
              <Card.Body>
                <Image src={contactImage} alt="Contact" width="100%" className="mb-2 rounded" />
                <h5 className="text-black"><strong>Contact Details</strong></h5> {/* White Heading */}
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
    );
  };
  
  export default ContactForm;