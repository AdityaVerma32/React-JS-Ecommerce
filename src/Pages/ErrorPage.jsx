import React from 'react'
import { useNavigate } from 'react-router-dom';

function ErrorPage() {


    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
                <img
                    src="https://via.placeholder.com/300x200.png?text=404+Error"
                    alt="Error Illustration"
                    className="w-full h-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-red-500 mb-2">Oops! Page Not Found</h1>
                <p className="text-gray-600 mb-4">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <button
                    onClick={goToHome}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
}

export default ErrorPage
