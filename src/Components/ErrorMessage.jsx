import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearError } from '../Redux/Slice/ErrorSlice'


function ErrorMessage() {

    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const { errorMessage } = useSelector((state) => state.error)

    useEffect(() => {
        if (errorMessage) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                dispatch(clearError());
            }, 5000);
        }
    }, [errorMessage, dispatch])

    if (!showError || !errorMessage) return null;

    return (
        <div
            className="fixed left-1/2 transform -translate-x-1/2 top-16 bg-gradient-to-r from-lightBlue-400 via-purple-300 to-white text-purple px-6 py-4 rounded-lg shadow-lg transition-all ease-in-out duration-300"
            style={{
                transform: showError ? 'translateY(0)' : 'translateY(-100%)',
                opacity: showError ? '1' : '0',
            }}
        >
            {errorMessage}
        </div>
    )
}

export default ErrorMessage
