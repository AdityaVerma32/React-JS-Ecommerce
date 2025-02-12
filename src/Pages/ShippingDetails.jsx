import React, { useEffect, useState } from 'react';
import AddressCard from '../Components/AddressCard';
import ErrorMessage from '../Components/ErrorMessage';
import SuccessMessage from '../Components/SuccessMessage';
import Loader from '../Components/Loader';
import { authorizedFetch } from '../Utils/authorizedFetch';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccessMessage, setErrorMessage } from '../Redux/Slice/PopUpMessageSlice';
import Swal from 'sweetalert2';
import { addOrder } from '../Redux/Slice/OrderSlice';
import { useNavigate } from 'react-router-dom';

function ShippingDetails() {
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [newAddress, setNewAddress] = useState({
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        phoneNo: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartId = useSelector((state) => state.cart.cartData);



    const handleAddressSelect = (addressId) => {
        setSelectedAddress(addressId);
    }

    // Function for Updating Password
    const SaveEditedPassword = async (newAddress) => {
        setLoading(true);
        try {
            const addressObject = {
                "street": newAddress.street,
                "city": newAddress.city,
                "state": newAddress.state,
                "postalCode": newAddress.postalCode,
                "country": newAddress.country,
                "phoneNo": newAddress.phoneNo
            }
            const response = await authorizedFetch("/shipping/update-address/" + newAddress.id, "PUT", addressObject, dispatch);
            if (response.data.success) {
                dispatch(setSuccessMessage("Address updated successfully"))
                fetchSavedAddress()
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    const deleteAddress = async (addressID) => {
        setLoading(true);
        // IF the Address is selected then, set the Selected address to null
        if (selectedAddress == addressID) {
            setSelectedAddress(null);
        }
        try {
            await authorizedFetch(`/shipping/delete-address/${addressID}`, 'DELETE', null, dispatch);
            setSavedAddresses(savedAddresses.filter(address => address.id !== addressID));
            dispatch(setSuccessMessage('Address deleted successfully'));
        } catch (error) {
            console.log("Error while Deleting Address")
        } finally {
            setLoading(false);
        }
    }

    const handleAddNewAddress = async (e) => {
        e.preventDefault();

        const { street, city, state, country, postalCode, phoneNo } = newAddress;

        // Validation
        if (!street || !city || !state || !country || !postalCode || !phoneNo) {
            alert("All fields are required. Please fill in all the details.");
            return;
        } else if (!/^\d{5,6}$/.test(postalCode)) {
            alert("Postal code must be 5 or 6 digits.");
            return;
        } else if (!/^\d{10}$/.test(phoneNo)) {
            alert("Phone number must be 10 digits.");
            return;
        } else {
            try {
                setLoading(true);
                const addressObject = {
                    "street": street,
                    "city": city,
                    "state": state,
                    "postalCode": postalCode,
                    "country": country,
                    "phoneNo": phoneNo
                }
                const response = await authorizedFetch('/shipping/add-new', 'POST', addressObject, dispatch);
                if (response.data.success) {
                    dispatch(setSuccessMessage("Address added successfully"))
                    fetchSavedAddress()
                    // Clear the form
                    setNewAddress({
                        street: "",
                        city: "",
                        state: "",
                        country: "",
                        postalCode: "",
                        phoneNo: "",
                    });
                }
            } catch (e) {
                console.log("Error While adding new Address: " + e);
            } finally {
                setLoading(false);
            }

        }
    };

    const   fetchSavedAddress = async () => {
        try {
            const response = await authorizedFetch('/shipping/fetch-all', 'GET', null, dispatch);
            if (response.data.success) {
                setSavedAddresses(response.data.data)
            } else {
                dispatch(setErrorMessage('Failed to fetch Saved Addresses'));
            }
        } catch (error) {
            console.log("Issue while fetching Saved Address: ", error)
        } finally {
            setLoading(false);
        }
    }

    const handleProceedToPayment = async () => {
        
        if (!selectedAddress) {
            Swal.fire({
                title: 'No selected address',
                text: "Please select an address to proceed to the checkout process.",
                icon: 'warning',
                confirmButtonText: 'Okay',
                showCancelButton: false,
                customClass: {
                    confirmButton: 'bg-blue-500 text-white hover:bg-blue-600',
                },
            })
            return;
        }  

        
        if(cartId == null){
            dispatch(setErrorMessage("Some Error Occurred!"));
        }else{
            console.log( JSON.stringify({ cartId, addressId: selectedAddress }));
            const response = await authorizedFetch('/orders/create-order', 'POST', JSON.stringify({ cartId, addressId: selectedAddress }), dispatch);
            if(response.data.success){
                console.log(response.data.data);
                dispatch(addOrder(response.data.data));
                navigate('/order-confirm')
            }else{
                dispatch(setErrorMessage("Some Error Occurred!"));
            }
        }
    }


    useEffect(() => {
        setLoading(true);
        fetchSavedAddress();
    }, [])

    return (
        <div className="max-w-5xl mx-auto p-6">
            <ErrorMessage />
            <SuccessMessage />
            {loading && <Loader />}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Details</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Saved Addresses */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Addresses</h2>
                    {savedAddresses.length > 0 ? (
                        savedAddresses.map((address) => (
                            <AddressCard
                                key={address.id}
                                address={address}
                                isSelected={selectedAddress && selectedAddress == address.id}
                                onSelect={handleAddressSelect}
                                onEdit={SaveEditedPassword}
                                onDelete={deleteAddress}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">No saved addresses. Please add one below.</p>
                    )}
                </div>

                {/* Add New Address Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Address</h2>
                    <form onSubmit={handleAddNewAddress}>
                        <div className="mb-4">
                            <label
                                htmlFor="street"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Street
                            </label>
                            <input
                                type="text"
                                id="street"
                                value={newAddress.street}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, street: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Street address"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                City
                            </label>
                            <input
                                id="city"
                                type="test"
                                value={newAddress.city}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, city: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter City"
                            ></input>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="state"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                State
                            </label>
                            <input
                                type="text"
                                id="state"
                                value={newAddress.state}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, state: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter State"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={newAddress.country}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, country: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Country"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="postalCode"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                value={newAddress.postalCode}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, postalCode: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Postal Code"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="PhoneNo"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="PhoneNo"
                                value={newAddress.phoneNo}
                                onChange={(e) =>
                                    setNewAddress({ ...newAddress, phoneNo: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Phone Number"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Add Address
                        </button>
                    </form>
                </div>
            </div>

            {/* Continue Button */}
            <div className="mt-6 text-right">
                <button
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={handleProceedToPayment}
                // disabled={!selectedAddress}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}

export default ShippingDetails;
