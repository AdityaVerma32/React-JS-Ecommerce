import React, { useState } from 'react'
import { registerUser } from '../api'
import Loader from '../Components/Loader';

function RegistrationPage() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "USER",
        firstName: "",
        lastName: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });
    const [popupMessage, setPopupMessage] = useState(null);  // State for managing popup visibility
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if the first name is provided
        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        }

        // Check if the last name is provided
        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        }

        // Check if the email is valid
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Check if password length is sufficient
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        // Return true if no errors, otherwise false
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // console.log("User Data: ", formData);
            // Add API call logic here

            setLoading(true);  // Show loading spinner while registering
            // Make API call to register the user
            try {
                const response = await registerUser(formData);  // Registration API
                setFormData({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                })
                console.log('User registered successfully', response);

                // Set popup message on successful registration
                setPopupMessage({ type: 'success', message: 'Registration successful! Please log in.' });

                // Hide the popup after 3 seconds (optional)
                setTimeout(() => {
                    setPopupMessage(null);  // Hide the popup after 3 seconds
                }, 5000);

            } catch (error) {
                console.error('Error during registration:', error);
                setPopupMessage({ type: 'error', message: 'Registration failed. Please try again.' });
            } finally {
                setLoading(false); // Stop loader
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            {loading && <Loader />} {/* Show loader while loading */}
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                {/* Popup Message */}
                {popupMessage && (
                    <div
                        className={`p-3 mb-4 text-center rounded-lg ${popupMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}
                    >
                        {popupMessage.message}
                    </div>
                )}
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">Or register with</p>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-2 flex items-center justify-center w-full"
                    >
                        <span className="mr-2">
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12 12v8.667h4.9c-1.2 2.933-3.934 4.966-7.4 4.966-4.6 0-8.334-3.734-8.334-8.334 0-4.6 3.733-8.333 8.334-8.333 2.2 0 4.2.867 5.734 2.267l-2.467 2.467c-.733-.6-1.667-.867-2.767-.867-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2c2.033 0 3.433-1.2 3.833-2.8H12v-3.133h8.066c.067.4.1.867.1 1.333 0 4.866-3.267 8.3-8.033 8.3-4.667 0-8.534-3.866-8.534-8.534C3.466 7.534 7.333 3.667 12 3.667c2.734 0 5.133 1.066 6.9 2.8L15.1 8.934c-.866-.8-2-1.267-3.1-1.267z"
                                ></path>
                            </svg>
                        </span>
                        Register with Google
                    </button>
                </div>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Login here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default RegistrationPage
