import React, { useState } from "react";
import { createRoot } from "react-dom/client";
// import Navbar from "./src/Navbar";
// import Sidebar from "./src/Sidebar";
import { BrowserRouter,HashRouter,Route, Routes } from "react-router-dom";

import Login from "./src/Login";
import Register from "./src/Register";
// import Deliverytracking from "./src/Deliverytracking";
import Orderhistory from "./src/Orderhistory";
import AddtoCart from "./src/AddtoCart";
import Home from "./src/Home";
import Payment from "./src/Payment";
import Confirmation from "./src/Confirmation";
import Cancel from "./src/Cancel";
import ProductDetails from "./src/ProductDetails";

function Exam() {
    // const [visible, setVisible] = useState(false);

    return (
        <div>
            {/* <BrowserRouter> */}
            <HashRouter>
                 {/* <Navbar visible={visible} setVisible={setVisible} />
                {visible && <Sidebar />} 
                 */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<AddtoCart />} />
                    <Route path="/pay" element={<Payment />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/order" element={<Orderhistory />} />
                    {/* <Route path="/delivery" element={<Deliverytracking />} /> */}
                    <Route path="/product/:id" element={<ProductDetails />} /> 
                </Routes>
                </HashRouter>
            {/* </BrowserRouter> */}
        </div>
    );
}

const root = createRoot(document.getElementById("app"));
root.render(<Exam />);
