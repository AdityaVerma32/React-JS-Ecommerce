import React, { useEffect, useState } from 'react'
import CartProduct from '../Components/Cart/CartProduct';
import { setErrorMessage, setSuccessMessage } from '../Redux/Slice/PopUpMessageSlice';
import { useDispatch, useSelector } from 'react-redux';
import SuccessMessage from '../Components/SuccessMessage';
import Loader from '../Components/Loader';
import { authorizedFetch } from '../Utils/authorizedFetch';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../Redux/Slice/OrderSlice';
import { addOrderInProgress } from '../Redux/Slice/OrderInProgressSlice';
import ErrorMessage from '../Components/ErrorMessage';

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
    const [cartId, setCartid] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const orderInProgressData = useSelector((state) => state.orderInProgressData)

    const fetchCartData = async () => {
        try {
            const response = await authorizedFetch("/cart/products", "GET", null, dispatch);
            if (response.data.success && response.data.data) {
                setCartdata(response.data.data);
                // The cart item in the order in progress is the first item in the array
                dispatch(addOrderInProgress(response.data.data));
                setCartid(response.data.data[0].cart.id);
            } else {
                console.error('Error fetching cart data:', response.message);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        } finally {
            setLoading(false);
        }
    };



    const handleProceedToCheckout = async () => {
        setLoading(true);
        if (cartData.length === 0) {
            dispatch(setErrorMessage('Cart is empty'));
            return;
        } else {
            const response = await authorizedFetch('/orders/create-order', 'POST', JSON.stringify({ cartId }), dispatch);
            if (response.data.success) {
                dispatch(addOrder(response.data.data));
                setLoading(false);
                navigate('/order-confirm')
            } else {
                setLoading(false);
                dispatch(setErrorMessage("Some Error Occurred!"));
            }
        }
    }

    useEffect(() => {
        if (mockData) {
            setCartdata(cartItems);
        } else {
            setLoading(true);
            fetchCartData();
        }
    }, [mockData])

    // Handle Quantity Change (Increase/Decrease)
    const handleQuantityChange = async (id, quantity) => {
        try {
            setLoading(true);
            const response = await authorizedFetch("/cart/update-product/" + id, "POST", { quantity: quantity }, dispatch);
            if (response.data.success) {
                dispatch(setSuccessMessage('Quantity updated successfully'));
                fetchCartData();
            } else {
                dispatch(setErrorMessage('Failed to update quantity'));
            }
        } catch (error) {
            console.error('Failed to update quantity with Error: ', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Delete Product from Cart
    const handleDeleteProduct = async (id) => {
        try {
            setLoading(true);
            const response = await authorizedFetch("/cart/delete-product/" + id, "DELETE", null, dispatch);
            if (response.data.success) {
                dispatch(setSuccessMessage('Product deleted successfully'));
                fetchCartData();
            } else {
                dispatch(setErrorMessage('Failed to delete product'));
            }
        } catch (error) {
            console.error('Error deleting product:', error.message);
        } finally {
            setLoading(false);
        };
    };

    return (
        <>
            <div className="flex-grow max-w-7xl mx-auto p-6">
                <SuccessMessage />
                <ErrorMessage />
                {loading && <Loader />}
                <h1 className="text-3xl font-semibold text-gray-900 mb-6">Your Cart</h1>
                {cartData.length === 0 ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-xl text-center text-gray-500">Your cart is empty!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {cartData.map((item) => (
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
                            onClick={handleProceedToCheckout}
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
