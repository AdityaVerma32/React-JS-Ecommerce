import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { authorizedFetch } from '../Utils/authorizedFetch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const [orderDetails, setOrderDetails] = useState(null);
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendOrderData = async (id) => {
        try {
            const response = await authorizedFetch(
                '/payment/saveOrderData',
                'POST',
                JSON.stringify({ sessionId: id }),
                dispatch
            );
            if (response.data.success) {
                console.log(response.data.data);
                setOrderDetails(response.data.data);
            }
        } catch (error) {
            console.log('Some error occurred: ' + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('session_id');
        if (id) {
            sendOrderData(id);
        } else {
            navigate('page-not-found');
        }
    }, [location]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <Loader />
                    <p className="text-xl font-medium text-gray-700 mt-4">
                        Please wait while the transaction is being completed...
                    </p>
                </div>
            </div>
        );
    }

    console.log(orderDetails);
    

    if (orderDetails!=null) {
        return (
            <div className="container max-w-4xl mx-auto p-6" >
                <div className="bg-green-50 border border-green-400 rounded-lg p-6 mb-6">
                    <h1 className="text-3xl font-semibold text-green-700">Thank You for Your Purchase!</h1>
                    <p className="mt-2 text-lg text-green-600">Your payment was successfully processed.</p>

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold">Order Details</h2>
                        <ul className="mt-4 space-y-4">
                            {orderDetails.map((item) => (
                                <li key={item.product.id} className="flex justify-between items-center border-b py-2">
                                    <span className="font-semibold">{item.product.productName}</span>
                                    <span>
                                        {item.quantity} x ${item.product.price}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="text-lg font-semibold text-gray-900">
                                ${orderDetails[0]?.orders?.totalAmount?.toFixed(2)}
                            </span>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold">Shipping Address</h3>
                            <p>{orderDetails[0]?.orders?.shippingAddress?.street}</p>
                            <p>
                                {orderDetails[0]?.orders?.shippingAddress?.city},{' '}
                                {orderDetails[0]?.orders?.shippingAddress?.state}{' '}
                                {orderDetails[0]?.orders?.shippingAddress?.postalCode}
                            </p>
                            <p>{orderDetails[0]?.orders?.shippingAddress?.country}</p>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
};

export default PaymentSuccess;
