import React, { useEffect, useState, useId } from 'react'
import CartProduct from '../Components/Cart/CartProduct';
import axios from 'axios';

function CartPage() {

    const cartItems = [
        {
            "id": 4,
            "cart": {
                "id": 1,
                "user": {
                    "id": 14
                },
                "totalPrice": 729.98
            },
            "product": {
                "productImage": "https://res.cloudinary.com/dczmaqwot/image/upload/v1737270876/pz8iix4zj1aze4pd5xjy.jpg",
                "price": 599.9900,
                "stock": 50,
                "createdAt": "2025-01-01T10:00:00",
                "updatedAt": "2025-01-19T12:44:36.087732",
                "id": 1,
                "description": "High-quality smartphone with 128GB RAM.",
                "productName": "Smartphone"
            },
            "quantity": 1,
            "price": 599.99,
            "createdAt": "2025-01-16T06:24:26.243199",
            "updatedAt": "2025-01-16T06:24:26.243199"
        },
        {
            "id": 6,
            "cart": {
                "id": 1,
                "user": {
                    "id": 14
                },
                "totalPrice": 729.98
            },
            "product": {
                "productImage": "https://res.cloudinary.com/dczmaqwot/image/upload/v1737270790/tmym0uk4xor3d1jz8zam.jpg",
                "price": 129.9900,
                "stock": 100,
                "createdAt": "2025-01-02T12:30:00",
                "updatedAt": "2025-01-19T12:43:10.361612",
                "id": 2,
                "description": "Noise-cancelling wireless earbuds.",
                "productName": "Wireless Earbuds"
            },
            "quantity": 1,
            "price": 129.99,
            "createdAt": "2025-01-20T10:06:56.033231",
            "updatedAt": "2025-01-20T10:06:56.033231"
        }
    ];
    const mockData = false;
    const [cartData, setCartdata] = useState([]);
    const baseUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (mockData) {
            setCartdata(cartItems);
        } else {
            // If mockData is false, fetch data from the API
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage or wherever you store it
            const fetchCartData = async () => {
                await axios.get(baseUrl + '/cart/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }).then((response) => {
                    // console.log(response)
                    if (response.status === 200) {
                        console.log(response.data.data)
                        setCartdata(response.data.data); // Update state with fetched cart data
                    } else {
                        console.error('Failed to fetch cart data:', response.status);
                    }
                }).catch((error) => {
                    console.error('Error fetching cart data:', error.message);
                }); // Make GET request to fetch cart data
            };

            fetchCartData();
        }
    }, [mockData])

    // Handle Quantity Change (Increase/Decrease)
    const handleQuantityChange = (id, action) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1,
                    }
                    : item
            )
        );
    };

    // Handle Delete Product from Cart
    const handleDeleteProduct = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Calculate Total Price
    // const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">Your Cart</h1>

                {cartData.length === 0 ? (
                    <p className="text-xl text-center text-gray-500">Your cart is empty!</p>
                ) : (
                    <div className="space-y-6">
                        {
                            cartData.map((item) => (
                                <CartProduct
                                    key={item.product.id}
                                    item={item}
                                    handleQuantityChange={handleQuantityChange}
                                    handleDeleteProduct={handleDeleteProduct}
                                />
                            ))}
                    </div>
                )}

                {cartData.length > 0 && (
                    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Total Price</h2>
                            <p className="text-xl text-gray-800">
                                ${cartData[0].cart.totalPrice}
                            </p>
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                            onClick={() => alert('Proceeding to Checkout')}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartPage
