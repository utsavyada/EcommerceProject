// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "../../css/orderhistory.css";
// // import Navbar from "./Navbar";

// // export default function Orderhistory() {
// //     const [userData, setUserData] = useState([]);
// //     const [productData, setProductData] = useState([]);
// //     const [isTrue, setIsTrue] = useState(false);
// //     const [show,setShow]=useState(true);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             const storedData = localStorage.getItem("user-info");
// //             if (storedData) {
// //                 const parsedData = JSON.parse(storedData);
// //                 setUserData(parsedData.customer[0]);
// //                 const response = await axios.post("http://localhost/api/show", {
// //                     email: userData.email,
// //                 });
// //                 setProductData(response.data);
// //                 setIsTrue(true);
// //                 // console.log(response.data);
// //                 // console.log(userData.email);
// //             }
// //         };
// //         fetchData();
// //     }, [isTrue]);

// //     // const details = (id) => {
// //     //     setIsTrue(false);
// //     //     navigate(`/delivery`, {
// //     //         state: id,
// //     //     });
// //     // };  not for use

// //     const order = async (id) => {
// //         setShow(false);
// //         const response = await axios.post(
// //           "http://localhost/api/cancelOrder",
// //           {
// //             delivery_id: id,
// //           }
// //         );
// //         window.location.reload();

// //     };


// //     const formatDate = (dateString) => {
// //         const date = new Date(dateString);
// //         const formattedDate = date.toLocaleDateString("en-GB");
// //         return formattedDate;
// //     };
// //     return (
// //         <>
// //             <Navbar />
// //             <div className="order-history-container">
// //                 {productData.length === 0 ? (
// //                     <p className="Empty">No History found</p>
// //                 ) : (
// //                     <table className="order-history-table">
// //                         <thead>
// //                             <tr>
// //                                 <th> Purchase Date</th>
// //                                 <th> Product Name</th>
// //                                 <th>Price</th>
// //                                 <th>Quantity</th>
// //                                 <th>Total</th>
// //                                 <th>Status</th>
// //                                 <th>Action</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {productData.map((product, index) => (
// //                                 <tr key={index}>
// //                                     <td>{formatDate(product.purchase)}</td>
// //                                     <td>{product.name}</td>
// //                                     <td>{product.price}</td>
// //                                     <td>{product.qty}</td>
// //                                     <td>{product.total}</td>
// //                                     <td>{product.status}</td>
// //                                     <td><button className="btn"   onClick={() => order(product.delivery_id)}>Cancel</button></td>
// //                                     {/* <td onClick={() => details(product.id)}>Delivery Status</td> */}
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>
// //         </>
// //     );
// // }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/orderhistory.css";
import Navbar from "./Navbar";

export default function Orderhistory() {
  const [userData, setUserData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isTrue, setIsTrue] = useState(false);
  const [show, setShow] = useState(true);
  const [clickedDeliveryIds, setClickedDeliveryIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("user-info");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData.customer[0]);
        const response = await axios.post("http://localhost/api/show", {
          email: userData.email,
        });
        setProductData(response.data);
        setIsTrue(true);
      }
    };
    fetchData();

    // Retrieve clickedDeliveryIds from local storage
    const storedClickedDeliveryIds = localStorage.getItem("clicked-delivery-ids");
    if (storedClickedDeliveryIds) {
      setClickedDeliveryIds(JSON.parse(storedClickedDeliveryIds));
    }
  }, [isTrue]);

  useEffect(() => {
    // Save clickedDeliveryIds to local storage
    localStorage.setItem("clicked-delivery-ids", JSON.stringify(clickedDeliveryIds));
  }, [clickedDeliveryIds]);

  const order = async (id) => {
    if (!clickedDeliveryIds.includes(id)) {
      setClickedDeliveryIds([...clickedDeliveryIds, id]);
      setShow(false);
      const response = await axios.post(
        "http://localhost/api/cancelOrder",
        {
          delivery_id: id,
        }
      );
    }
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
      <Navbar />
      <div className="order-history-container">
        {productData.length === 0 ? (
          <p className="Empty">No History found</p>
        ) : (
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Purchase Date</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={index}>
                  <td>{formatDate(product.purchase)}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>{product.total}</td>
                  <td>{product.status}</td>
                  {product.status !== "DELIVERED" && !clickedDeliveryIds.includes(product.delivery_id) ? (
                    <td>
                      <button
                        className="btn"
                        onClick={() => order(product.delivery_id)}
                      >
                        Cancel
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
