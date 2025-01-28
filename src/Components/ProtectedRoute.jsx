import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setErrorMessage } from '../Redux/Slice/PopUpMessageSlice';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token'); // Directly access localStorage here

  useEffect(() => {
    if (!token) {
      // Dispatch error message as a side effect
      dispatch(setErrorMessage("Please Log in"));
    }
  }, [token, dispatch]);

  if (!token) {
    // Redirect to the login page if the token is not present
    return <Navigate to="/" />;
  }

  return children; // If the token exists, render the child route
};

export default ProtectedRoute;
