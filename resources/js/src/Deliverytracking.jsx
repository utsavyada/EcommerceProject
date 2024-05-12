// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import "../../css/delivery.css";
// import Navbar from "./Navbar";

// const Deliverytracking = () => {

//     const location = useLocation();
//     const id = location.state;
//     const [delivery, setDelivery] = useState(null);

//     useEffect(() => {
//         const fetchDeliveryData = async () => {
//             try {
//                 const response = await axios.get(`/api/delivery/${id}`);
//                 setDelivery(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchDeliveryData();
//     }, [id]);

//     if (!delivery) {
//         return <div>Loading...</div>;
//     }

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const formattedDate = date.toLocaleDateString("en-GB");
//         return formattedDate;
//     };

//     return (
//         <>
//         <Navbar/>
//         <div className="delivery-tracking-container">
//             <h3>Delivery Tracking for Delivery ID: {id}</h3>

//             <table>
//                 <thead>
//                     <tr>
//                         <th> Status</th>
//                         <th>Time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {delivery.map((product, index) => (
//                         <tr key={index}>
//                             <td>{product.status}</td>
//                             <td>{formatDate(product.updated_at)}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//         </>
//     );
// };

// export default Deliverytracking;
// for now it is not useful
