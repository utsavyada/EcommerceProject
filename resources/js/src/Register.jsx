import React, { useState } from "react";
import "../../css/register.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSignUp() {
        if (!name || !email || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        let item = { name, email, password };
        let result = await fetch("http://localhost/api/register", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        result = await result.json();

        if (result.status === "error") {
            setErrorMessage("This email is already taken");
        } else {
            // localStorage.setItem("user-info", JSON.stringify(result));
            // navigate("/", {
            //     state: email,
            // });
            // alert("Redirect to Login page......")
            navigate("/login");
        }
    }

    return (
        <>
            <Navbar />
            <div className="body">
                <div className="form-container">
                    <h1>Registration Form</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email"
                        required
                    />
                    <br />
                    <br />
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />
                    <br />
                    <br />
                    {errorMessage && (
                        <p className="error-message">{errorMessage}</p>
                    )}
                    <button onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </>
    );
}
