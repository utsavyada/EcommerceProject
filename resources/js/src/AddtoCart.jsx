// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import "../../css/cart.css";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// export default function AddtoCart() {
//     const [userData, setUserData] = useState([]);
//     const [productList, setProductList] = useState([]);
//     const [quantity, setQuantity] = useState({});

//     const navigate = useNavigate();
//     const increaseQuantity = (productId) => {
//         setQuantity((prevState) => ({
//             ...prevState,
//             [productId]: (prevState[productId] || 1) + 1,
//         }));
//     };
//     const decreaseQuantity = (productId) => {
//         if (quantity[productId] < 1) {
//             removeProduct(productId);
//             return;
//         }
//         setQuantity((prevState) => ({
//             ...prevState,
//             [productId]: (prevState[productId] || 1) - 1,
//         }));
//     };
//     const removeProduct = async (productId) => {
//         try {
//             const response = await axios.delete(
//                 `http://localhost/api/removecart?user_id=${userData.id}&product_id=${productId}`
//             );
//             if (response.status === 200) {
//                 const updatedProductList = productList.filter(
//                     (item) => item.id !== productId
//                 );
//                 setProductList(updatedProductList);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const totalPtice = async () => {
//         const totalPri = await axios.get("http://localhost/api/orders/total", {
//             params: {
//                 email: userData.email,
//             },
//         });
//         const sum = await totalPri.data.total;
//         navigate("/pay", {
//             state: sum,
//         });
//     };
//     const buyNow = async () => {
//         try {
//             const promises = productList.map((item) =>
//                 axios.post("http://localhost/api/orders", {
//                     user_id: userData.id,
//                     product_id: item.id,
//                     email: userData.email,
//                     qty: quantity[item.id] != null ? quantity[item.id] : 1,
//                     price: item.price,
//                 })
//             );
//             const responses = await Promise.all(promises);
//             // setProductList([]);
//             totalPtice();
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const productData = await axios.get(
//                     `http://localhost/api/cartdetails/${userData.email}`
//                 );
//                 setProductList(productData.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         };
//         if (userData.email) {
//             fetchProduct();
//         }
//     }, [userData]);
//     useEffect(() => {
//         const fetchData = () => {
//             const storedData = localStorage.getItem("user-info");
//             if (storedData) {
//                 const parsedData = JSON.parse(storedData);
//                 setUserData(parsedData.customer[0]);
//                 console.log("userData",userData)
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//         <Navbar/>
//         <div className="cart-container">
//             {productList.length === 0 ? (
//                 <p className="empty-cart">Empty cart</p>
//             ) : (
//                 productList.map((item, id) => (
//                     <div className="cart-item" key={id}>
//                         <div className="cart-item-image">
//                             <img
//                                 src={`http://localhost/storage/${item.images}`}
//                                 alt={item.name}
//                             />
//                         </div>
//                         <div className="cart-item-details">
//                             <h1>{item.name}</h1>
//                             <p>{item.description}</p>
//                             <p className="price">Price: {item.price}</p>
//                             <p className="quantity">{`Quantity: ${quantity[item.id] || 1}`}</p>
//                             <br />
//                             <button onClick={() => increaseQuantity(item.id)}>
//                                 +
//                             </button>
//                             <button onClick={() => decreaseQuantity(item.id)}>
//                                 -
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             )}
//         </div>
//         <div className="button-container">
//             <button onClick={buyNow}>Buy Now</button>
//         </div>
//         </>
//     );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/cart.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function AddtoCart() {
    const [userData, setUserData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [quantity, setQuantity] = useState({});

    const navigate = useNavigate();
    const increaseQuantity = (productId) => {
        setQuantity((prevState) => ({
            ...prevState,
            [productId]: (prevState[productId] || 1) + 1,
        }));
    };

    const decreaseQuantity = (productId) => {
        if (quantity[productId] < 1) {
            removeProduct(productId);
            return;
        }
        setQuantity((prevState) => ({
            ...prevState,
            [productId]: (prevState[productId] || 1) - 1,
        }));
    };

    const removeProduct = async (productId) => {
        try {
            const response = await axios.delete(
                `http://localhost/api/removecart?user_id=${userData.id}&product_id=${productId}`
            );
            if (response.status === 200) {
                const updatedProductList = productList.filter(
                    (item) => item.id !== productId
                );
                setProductList(updatedProductList);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const totalPrice = async () => {
        const totalPri = await axios.get("http://localhost/api/orders/total", {
            params: {
                email: userData.email,
            },
        });

        const sum = await totalPri.data.total;
        navigate("/pay", {
            state: sum,
        });
    };

    const buyNow = async () => {
        try {
            const promises = productList.map((item) =>
                axios.post("http://localhost/api/orders", {
                    user_id: userData.id,
                    product_id: item.id,
                    email: userData.email,
                    qty: quantity[item.id] != null ? quantity[item.id] : 1,
                    price: item.price,
                })
            );

            const responses = await Promise.all(promises);
            totalPrice();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await axios.get(
                    `http://localhost/api/cartdetails/${userData.email}`
                );
                setProductList(productData.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (userData.email) {
            fetchProduct();
        }
    }, [userData]);

    useEffect(() => {
        const fetchData = () => {
            const storedData = localStorage.getItem("user-info");
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData.customer[0]);
                console.log("userData", userData);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="cart-container">
                {productList.length === 0 ? (
                    <p className="empty-cart">Empty cart, Go and Shop </p>
                ) : (
                    productList.map((item, id) => (
                        <div className="cart-item" key={id}>
                            <div className="cart-item-image">
                                <img
                                    src={`http://localhost/storage/${item.images}`}
                                    alt={item.name}
                                />
                            </div>
                            <div className="cart-item-details">
                                <h1>{item.name}</h1>
                                <p>{item.details}</p>
                                <p className="price">Price: {item.price}</p>
                                <p className="quantity">{`Quantity: ${
                                    quantity[item.id] || 1
                                }`}</p>
                                <br />
                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                -
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {productList.length > 0 && (
                <div className="button-container">
                    <button onClick={buyNow}>Buy Now</button>
                </div>
            )}
        </>
    );
}
