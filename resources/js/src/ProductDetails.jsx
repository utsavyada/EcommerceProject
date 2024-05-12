// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar";

// function ProductDetails() {
//     const { id } = useParams();
//     const [productDetails, setProductDetails] = useState(null);
//     const [isAddedToCart, setIsAddedToCart] = useState(false);
//     const [userData, setUserData] = useState([]);
//     const navigate=useNavigate();
//     const handleAddToCart = async () => {

//         ///
//         if (!userData.id) {
//             // navigate("/login");
//             alert("Please log in to add items to cart.");
//             return;
//         }

//         ///
//         const data = {
//             user_id: userData.id,
//             product_id: id,
//             email: userData.email,
//         };

//         try {
//             await axios.post("http://localhost/api/addtocart", data);
//             setIsAddedToCart(true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleRemoveFromCart = async () => {
//         const data = {
//             user_id: userData.id,
//             product_id: id,
//         };

//         try {
//             await axios.delete("http://localhost/api/removecart", { data });
//             setIsAddedToCart(false);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const fetchData = () => {
//         const storedData = localStorage.getItem("user-info");
//         if (storedData) {
//             const parsedData = JSON.parse(storedData);
//             setUserData(parsedData.customer[0]);
//         }
//     };

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             const response = await axios.get(
//                 `http://localhost/api/product/${id}`
//             );
//             setProductDetails(response.data);
//         };

//         fetchProductDetails();
//         fetchData();
//     }, [id]);
//     if (!productDetails) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//         <Navbar/>
//         <div className="product-details-container">
//             <h2>{productDetails.name}</h2>
//             <img
//                 style={{ width: 200, height: 200, borderRadius: 5 }}
//                 src={`http://localhost/storage/${productDetails.images}`}
//                 alt={productDetails.name}         className="product-image"

//             />
//             <p className="product-description">{`Description: ${productDetails.description}`}</p>
//             <p className="product-price">{`Price: ${productDetails.price}`}</p>
//             <p className="product-stock">{` Product in Stock: ${productDetails.stock}`}</p>
//             {/* <p className="product-id">{`Product Id: ${productDetails.id}`}</p> */}
//             <p className="product-offer">
//                 Combo offers Add more...
//             </p>
//             <p>
//                 <strong className="product-card">Use Credit Cards for more offers...</strong>
//             </p>
//             {isAddedToCart ? (
//                 <button className="product-remove-from-cart" onClick={handleRemoveFromCart}>Remove from Cart</button>
//             ) : (
//                 <button className="product-add-to-cart"  onClick={handleAddToCart}>Add to Cart</button>
//             )}
//         </div>
//         </>
//     );
// }

// export default ProductDetails;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function ProductDetails() {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        if (!userData.id) {
            // navigate("/login");
            alert("Please log in to add items to cart.");
            return;
        }

        const data = {
            user_id: userData.id,
            product_id: id,
            email: userData.email,
        };

        try {
            await axios.post("http://localhost/api/addtocart", data);
            setIsAddedToCart(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveFromCart = async () => {
        const data = {
            user_id: userData.id,
            product_id: id,
        };

        try {
            await axios.delete("http://localhost/api/removecart", { data });
            setIsAddedToCart(false);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchData = () => {
        const storedData = localStorage.getItem("user-info");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData.customer[0]);
        }
    };

    useEffect(() => {
        const fetchProductDetails = async () => {
            const response = await axios.get(
                `http://localhost/api/product/${id}`
            );
            setProductDetails(response.data);
        };

        fetchProductDetails();
        fetchData();
    }, [id]);

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="product-details-container">
                <h2>{productDetails.name}</h2>
                <img
                    style={{ width: 200, height: 200, borderRadius: 5 }}
                    src={`http://localhost/storage/${productDetails.images}`}
                    alt={productDetails.name}
                    className="product-image"
                />
                <p className="product-description">{productDetails.details}</p>
                <p className="product-description">{`Description: ${productDetails.description}`}</p>
                <p className="product-price">{`Price: ${productDetails.price}`}</p>
                {productDetails.stock === 0 ? (
                    <p className="product-stock out-of-stock">Out of Stock</p>
                ) : (
                    <p className="product-stock">{`Product in Stock: ${productDetails.stock}`}</p>
                )}
                <p className="product-offer">Combo offers Add more...</p>
                <p>
                    <strong className="product-card">
                        Use Credit Cards for more offers...
                    </strong>
                </p>
                {productDetails.stock === 0 ? null : isAddedToCart ? (
                    <button
                        className="product-remove-from-cart"
                        onClick={handleRemoveFromCart}
                    >
                        Remove From Cart
                    </button>
                ) : (
                    <button
                        className="product-add-to-cart"
                        onClick={handleAddToCart}
                    >
                        Add To Cart
                    </button>
                )}
            </div>
        </>
    );
}

export default ProductDetails;
