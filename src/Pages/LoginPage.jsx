import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputFieldError from '../Components/InputFieldError';
import Loader from '../Components/Loader';
import { LoginRequest, LoginSuccess, LoginError } from "../Redux/Slice/authSlice";
import axios from 'axios';

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [popupMessage, setpopupMessage] = useState(false);
  const { token, role, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_API_URL

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(LoginRequest());
      try {
        const response = await axios.post(baseURL + '/auth/login', { email, password });
        console.log(response.data);
        if (response.status === 200 && response.data.success === true) {
          dispatch(LoginSuccess(response.data));
          console.log(response.data.data.role);
          if (response.data.data.role === import.meta.env.VITE_USER) {
            navigate('/');
          } else if (response.data.role === import.meta.env.VITE_ADMIN) {
            // TODO: To be Handled
          }
        } else {
          setpopupMessageWithTimeout({ message: response.data.message, type: 'error' });
          dispatch(LoginError("Invalid Credentials"));
        }
      } catch (e) {
        console.log(e.message);
        setpopupMessageWithTimeout({ message: "Invalid Credentials", type: 'error' });
        dispatch(LoginError("Some Error Occurred"));
      }
    }
  };

  // Helper function to handle popup timeout
  const setpopupMessageWithTimeout = (messageObj) => {
    setpopupMessage(messageObj);
    setTimeout(() => {
      setpopupMessage(null);
    }, 3000); // Clears the message after 3 seconds
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <Loader />} {/* Show loader while loading */}
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {popupMessage && (
          <div
            className={`p-3 mb-4 text-center rounded-lg ${popupMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
          >
            {popupMessage.message}
          </div>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && <InputFieldError errorMsg={errors.email} />}
          </div>
          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.password && <InputFieldError errorMsg={errors.password} />}
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Redirect to Registration */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
