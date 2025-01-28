import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setErrorMessage } from '../Redux/Slice/PopUpMessageSlice';
import ErrorMessage from '../Components/ErrorMessage';

const OrderConfirmation = () => {

    const dispatch = useDispatch();
    const { orderData } = useSelector((state) => state.order);

    const [order, setOrder] = useState([])

    useEffect(() => {
        if (orderData) {
            console.log("Order Details: " + orderData.Order_details);
            setOrder(orderData.Order_details);
        }
    }, [orderData])

    const handleStripePayment = () => {
        if (orderData.Strip_payment_link) {
            window.location.href = orderData.Strip_payment_link.paymentUrl; // Replace with your desired URL
        } else {
            dispatch(setErrorMessage('Some Error Occured!'));
        }
        return;
    }


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <ErrorMessage />
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Section: Order Product Details */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order Summary</h2>

                    {/* Order Item List */}
                    <div className="space-y-4">
                        {order.map((item) => (
                            <div key={item.product.id} className="flex justify-between items-center border-b pb-2 mb-2">
                                <div className="flex items-center">
                                    <img src={item.product.productImage} alt={item.product.productName} className="w-16 h-16 object-cover rounded-md mr-4" />
                                    <span className="font-medium text-gray-700">{item.product.productName}</span>
                                </div>
                                <span className="text-gray-600">{item.quantity} x ${item.product.price}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total Price */}
                    {order && order.length > 0 && order[0].orders && (
                        <div className="flex justify-between items-center pt-4 border-t">
                            <span className="font-semibold text-gray-800">Total</span>
                            <span className="text-lg font-semibold text-gray-900">
                                ${order[0].orders.totalAmount}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right Section: Payment Options */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Payment Method</h2>

                    {/* Payment Methods Section (Stripe + Future Payment Methods) */}
                    <div className="space-y-4">
                        {/* Stripe Payment Button */}
                        <div>
                            <button
                                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                                onClick={handleStripePayment}
                            >
                                Pay with Stripe
                            </button>
                        </div>

                        {/* Reserved Space for Other Payment Methods */}
                        <div className="space-y-2">
                            <button
                                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-300"
                                disabled
                            >
                                Pay with PayPal (Coming Soon)
                            </button>
                            <button
                                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-300"
                                disabled
                            >
                                Pay with PayU (Coming Soon)
                            </button>
                            <button
                                className="w-full py-3 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300 transition duration-300"
                                disabled
                            >
                                Pay with Authorize.Net (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
