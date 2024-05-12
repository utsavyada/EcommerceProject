// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import "../../css/home.css";
// import Navbar from "./Navbar";

// export default function Home() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [isTrue, setIsTrue] = useState(false);

//     const email = location.state;
//     console.log(email)

//     const [userData, setUserData] = useState([]);
//     const [product, setProduct] = useState([]);

//     const handleAdd = async (id) => {
//         setIsTrue(false);
//         const result = product.find((item) => item.id === id);
//         if (result) {
//             if (userData.length === 0) {
//                 // navigate("/login")
//                 alert("Please Log in to add items to cart.")
//             } else{
//             const updatedProduct = product.map((item) => {
//                 if (item.id === id) {
//                     return { ...item, isAddedToCart: true };
//                 }
//                 return item;
//             });

//             const data = {
//                 user_id: userData.id,
//                 product_id: id,
//                 email: email,
//             };

//             axios
//                 .post("http://localhost/api/addtocart", data)
//                 .then((response) => {
//                     setProduct(updatedProduct);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         }}
//     };

//     const details = (id) => {
//         navigate(`/product/${id}`);
//     };

//     const handleRemove = (id) => {
//         const updatedProduct = product.map((item) => {
//             if (item.id === id) {
//                 return { ...item, isAddedToCart: false };
//             }
//             return item;
//         });

//         const data = {
//             user_id: userData.id,
//             product_id: id,
//         };

//         axios
//             .delete("http://localhost/api/removecart", { data })
//             .then((response) => {
//                 setProduct(updatedProduct);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const data = await axios("http://localhost/api/display");
//             setProduct(data.data);
//         };
//         fetchProducts();
//     }, []);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await axios(`http://localhost/api/login/${email}`);
//             setUserData(data.data.customer[0]);
//             setIsTrue(true);
//         };
//         if (email) {
//             fetchData();
//         }
//     }, [isTrue]);

//     return (

//         <>
//            <Navbar/>
//             {userData.length !== 0 ? (
//                 <div>{`Welcome ${userData.name}!`}</div>
//             ) : (
//                 <div>Welcome guest user!</div>
//             )}
//             <div className="container">
//                 {product.map((item) => (
//                     <div className="card" key={item.id}>
//                         <p className="iname">{item.name}</p>
//                         <img
//                             style={{ width: 100, height: 100, borderRadius: 5 }}
//                             src={`http://localhost/storage/${item.images}`}
//                             alt={item.name}
//                             onClick={() => details(item.id)}
//                         />
//                         <div>
//                             <p className="idesc">{item.description}</p>
//                             <p className="price-label">{`Price : ${item.price}`}</p>
//                             {/* <p className="label stock-label">{`Stock : ${item.stock}`}</p> */}
//                         </div>

//                         {item.isAddedToCart ? (
//                             <button className="remove-from-cart" onClick={() => handleRemove(item.id)}>
//                                 RemoveFromCart
//                             </button>
//                         ) : (
//                             <button  className="add-to-cart" onClick={() => handleAdd(item.id)}>
//                                 AddToCart
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../css/home.css";
import Navbar from "./Navbar";

export default function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isTrue, setIsTrue] = useState(false);

    const email = location.state;
    console.log(email);

    const [userData, setUserData] = useState([]);
    const [product, setProduct] = useState([]);

    const handleAdd = async (id) => {
        setIsTrue(false);
        const result = product.find((item) => item.id === id);
        if (result) {
            if (userData.length === 0) {
                // navigate("/login")
                alert("Please Log in to add items to cart.");
            } else {
                const updatedProduct = product.map((item) => {
                    if (item.id === id) {
                        return { ...item, isAddedToCart: true };
                    }
                    return item;
                });

                const data = {
                    user_id: userData.id,
                    product_id: id,
                    email: email,
                };

                axios
                    .post("http://localhost/api/addtocart", data)
                    .then((response) => {
                        setProduct(updatedProduct);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    const details = (id) => {
        navigate(`/product/${id}`);
    };

    const handleRemove = (id) => {
        const updatedProduct = product.map((item) => {
            if (item.id === id) {
                return { ...item, isAddedToCart: false };
            }
            return item;
        });

        const data = {
            user_id: userData.id,
            product_id: id,
        };

        axios
            .delete("http://localhost/api/removecart", { data })
            .then((response) => {
                setProduct(updatedProduct);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await axios("http://localhost/api/display");
            setProduct(data.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios(`http://localhost/api/login/${email}`);
            setUserData(data.data.customer[0]);
            setIsTrue(true);
        };
        if (email) {
            fetchData();
        }
    }, [isTrue]);

    return (
        <>
            <Navbar />
            {userData.length !== 0 ? (
                <div className="msg">{`Welcome ${userData.name}!`}</div>
            ) : (
                <div className="msg">Welcome guest user!</div>
            )}
            <div className="container">
                {product.map((item) => (
                    <div className="card" key={item.id}>
                        <p className="iname">{item.name}</p>
                        <img className="pics"
                            src={`http://localhost/storage/${item.images}`}
                            alt={item.name}
                            onClick={() => details(item.id)}
                        />
                        <div>
                            <p className="idesc">{item.details}</p>
                            <p className="price-label">{`Price: ${item.price}`}</p>
                            {item.stock === 0 ? (
                                <p className="stock-label out-of-stock">
                                    Out of Stock
                                </p>
                            ) : (
                                // <p className="stock-label">{`Stock: ${item.stock}`}</p>
                                <p></p>
                            )}
                        </div>

                        {item.stock === 0 ? null : item.isAddedToCart ? (
                            <button
                                className="remove-from-cart"
                                onClick={() => handleRemove(item.id)}
                            >
                                Remove From Cart
                            </button>
                        ) : (
                            <button
                                className="add-to-cart"
                                onClick={() => handleAdd(item.id)}
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}
