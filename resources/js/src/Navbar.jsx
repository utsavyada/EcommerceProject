import React from "react";
import "../../css/navbar.css";
import { FaBars, FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

export default function Navbar({ visible, setVisible }) {
    const navigate = useNavigate();
    const userInfo = localStorage.getItem("user-info");
    const isLoggedIn = !!userInfo;

    // const handleButton = () => {
    //   setVisible(!visible);
    // };

    const handleLogOut = () => {
        localStorage.removeItem("user-info");
        // navigate("/");
        // console.log(data);
        window.location.reload();
        // navigate("/", { replace: true });
    };

    const pass = () => {
        if (isLoggedIn) {
            const data = JSON.parse(userInfo);
            const email = data.customer[0].email;
            navigate("/", { state: email });
        } else {
            navigate("/");
        }
    };
    return (
        <div>
            <nav className="nav">
                {/* <Button
          style={{ marginLeft: 10, marginTop: 2 }}
          onClick={handleButton}
        >
          <FaBars size={30} />
        </Button> */}
                <ul className="b1">
                    <li>quickSail webSite</li>
                </ul>
                <ul className="b2">
                    <li>
                        <a onClick={pass}>Home</a>
                    </li>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link to="/cart" style={{ margin: 5 }}>
                                    <FaCartPlus />
                                </Link>
                                <Link to="/cart">Add to Cart</Link>
                            </li>
                            <li>
                                <Link to="/order">Order History</Link>
                            </li>
                            <li>
                                <Link onClick={handleLogOut}>Log Out</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}
