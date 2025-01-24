import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrorMessage } from '../Redux/Slice/PopUpMessageSlice'


function ErrorMessage() {

    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const { ErrorMessage } = useSelector((state) => state.error)

    useEffect(() => {
        if (ErrorMessage) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
                dispatch(clearErrorMessage());
            }, 5000);
        }
    }, [ErrorMessage, dispatch])

    if (!ErrorMessage || !ErrorMessage) return null;

    return (
        <div
            className="fixed left-1/2 transform -translate-x-1/2 top-16 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white px-6 py-4 rounded-lg shadow-lg transition-all ease-in-out duration-300"
            style={{
                transform: showError ? 'translateY(0)' : 'translateY(-100%)',
                opacity: showError ? '1' : '0',
            }}
        >
            {ErrorMessage}
        </div>
    )
}

export default ErrorMessage
