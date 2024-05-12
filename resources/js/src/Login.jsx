import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css";
import Navbar from "./Navbar";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }
        //         const login= await axios(`http://localhost/api/login/${email}/${password}`);
        //         // if(login.status==="error"){
        //         //     setErrorMessage("Invalid");
        //         // }
        //         const data = await axios(`http://localhost/api/login/${email}`);
        //         console.log( "data",data)
        //         if (data) {
        //             localStorage.setItem("user-info", JSON.stringify(data.data));
        //             navigate('/', { state: email});
        //         } else {
        //             // alert("false");
        //             setErrorMessage("Invalid , please check");
        //         }
        // }
        // // setErrorMessage("Invalid , please check");

        try {
            const login = await axios(
                `http://localhost/api/login/${email}/${password}`
            );
            const data = await axios(`http://localhost/api/login/${email}`);
            // console.log("data", data);
            if (data) {
                localStorage.setItem("user-info", JSON.stringify(data.data));
                console.log("testing", data.data.customer[0].block);
                if (data.data.customer[0].block === "YES") {
                    setErrorMessage("User is blocked. Please contact Admin.");
                } else {
                    navigate("/", { state: email });
                }
            } else {
                //   setErrorMessage("Invalid credentials, please check");
            }
        } catch (error) {
            setErrorMessage("Invalid credentials, please check");
        }
    };

    return (
        <>
            <Navbar />
            <div className="body">
                <div className="loginform-container">
                    <h1>Sign in</h1>
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
                    {errorMessage && (
                        <p className="loginerror-message">{errorMessage}</p>
                    )}
                    <br />
                    <button onClick={handleLogin}>Sign in</button>
                </div>
            </div>
        </>
    );
}
