import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'



function adminProtectedRoutes({ children }) {

    useEffect(() => {
        // Fetch user details from local storage or API
        const { role } = useSelector((state) => state.auth);
        // Check if user is an admin
        // Redirect to login page if not an admin
    })

    return (
        <div>

        </div>
    )
}

export default adminProtectedRoutes
