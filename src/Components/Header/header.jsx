import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../..//Redux/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSuccessMessage } from '../../Redux/Slice/PopUpMessageSlice';

function header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('token'); // Check if user info is in localStorage (or use your preferred method)
  const { token } = useSelector((state) => state.auth);
  const { role, userDetails} = useSelector((state) => state.auth);
  // Example: Check user login status (You can modify this logic based on how you store authentication data, e.g., localStorage, cookies)
  useEffect(() => {
    if (user && token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }

    if (role === 'ROLE_ADMIN') {
      setShowCart(false);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false); // User is logged in
    dispatch(setSuccessMessage('Logged out successfully'));
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    console.log('User Role:', role);
    navigate('/user/' + userDetails.id);
  }

  return (
    <header className="flex justify-between items-center bg-gray-800 p-4 shadow-lg">
      {/* Logo */}
      <Link to={'/'}>
        <div className="flex items-center">
          <img
            src="src/assets/Images/App_logo.jpg"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <h1 className="text-white text-lg font-bold ml-2">StoreLoom</h1>
        </div>
      </Link>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Cart */}
        {showCart && (<button
          onClick={handleCartClick}
          className="flex items-center text-white hover:text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h10.9a1 1 0 00.9-1.5L17 13M5 21a2 2 0 100-4 2 2 0 000 4zm12 0a2 2 0 100-4 2 2 0 000 4z"
            />
          </svg>
        </button>)}

        {isLoggedIn && (<button
          onClick={handleProfileClick}
          className="flex items-center text-white hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A9.004 9.004 0 0112 15c2.1 0 4.065.684 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9 4.029 9 9z"
            />
          </svg>
        </button>)
        }
        {/* Conditional Login/Logout Button */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-2 pb-1 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-blue-600 text-white px-2 pb-1 rounded-lg hover:bg-blue-700">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  )
}

export default header
