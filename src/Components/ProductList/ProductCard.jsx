import React from 'react'

function ProductCard({product}) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
      <img
        src={product.productImage}
        alt={product.productName}
        className="h-40 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-bold mb-2 truncate">{product.productName}</h2>
      <p className="text-gray-500 mb-2">${product.price}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
