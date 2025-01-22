import React from 'react';

function CartProduct({ item, handleQuantityChange, handleDeleteProduct }) {
    return (
        <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
        >
            {/* Product Image */}
            <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
            />

            {/* Product Details */}
            <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            </div>

            {/* Quantity Control */}
            <div className="flex items-center space-x-4">
                <button
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, 'decrease')}
                    disabled={item.quantity <= 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20 12H4"
                        />
                    </svg>
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, 'increase')}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16M4 12h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Delete Button */}
            <button
                onClick={() => handleDeleteProduct(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
                Delete
            </button>
        </div>
    );
}

export default CartProduct;
