import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import { clearSuccessMessage } from '../Redux/Slice/PopUpMessageSlice'


function SuccessMessage() {

    const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    const { SuccessMessage } = useSelector((state) => state.error);

    useEffect(() => {
        if (SuccessMessage) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                dispatch(clearSuccessMessage());
            }, 5000);
        }
    }, [SuccessMessage, dispatch]);

    if (!showSuccess || !SuccessMessage) return null;

    return (
        <div
            className="fixed left-1/2 transform -translate-x-1/2 top-16 bg-gradient-to-r from-green-400 via-teal-300 to-white text-green-900 px-6 py-4 rounded-lg shadow-lg transition-all ease-in-out duration-300"
            style={{
                transform: showSuccess ? 'translateY(0)' : 'translateY(-100%)',
                opacity: showSuccess ? '1' : '0',
            }}
        >
            {SuccessMessage}
        </div>
    )
}

export default SuccessMessage
