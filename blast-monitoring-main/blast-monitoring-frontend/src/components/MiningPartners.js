import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "../index.css"; 
import jayantaImage from "../assets/jayanta.jpg";
import khadiaImage from "../assets/khadia.jpg";
import beenaImage from "../assets/beena.jpg";

const MiningPartners = () => {
    return (
        <section className="container text-center my-5 mining-partners-section">
            <h2 className="fw-bold mb-4 text-white">Our Mining Companies</h2>
            <div className="row justify-content-center g-4">
                <div className="col-md-4">
                    <div className="card shadow-lg border-0">
                        <img src={jayantaImage} alt="Jayanta Mine" className="card-img-top img-fluid" style={{ height: "300px", objectFit: "cover" }} />
                        <div className="card-body bg-dark text-white">
                            <p className="fw-bold mb-0">Jayanta Mine</p>
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
                            <p className="fw-bold mb-0">Beena Mine</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiningPartners;


