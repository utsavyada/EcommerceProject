import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/confirmation.css";
// import Navbar from "./Navbar";

export default function Confirmation() {
    const navigate = useNavigate();
    const pass = () => {
        const userInfo = localStorage.getItem("user-info");

        if (userInfo) {
            const data = JSON.parse(userInfo);
            const email = data.customer[0].email;
            navigate("/", { state: email });
        }
    };

    return (
        // <>
        // <Navbar/>
        <div className="confirmation-container">
            <div className="confirmation-box">
                <h2 className="confirmation-heading">
                    <strong>Thank you...</strong> for your purchase!
                </h2>
                <div className="confirmation-actions">
                    {/* <Link className="confirmation-link">
              Continue Shopping
            </Link> */}
                    <a className="confirmation-link" onClick={pass}>
                        Continue Shopping
                    </a>
                </div>
            </div>
        </div>
        /* </> */
    );
}
