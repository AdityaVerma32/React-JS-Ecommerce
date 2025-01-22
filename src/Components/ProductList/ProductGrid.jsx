import React from 'react'
import ProductCard from '../ProductList/ProductCard'
import { Link } from 'react-router-dom'

function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                    <ProductCard product={product} />
                </Link>
            ))}
        </div>
    )
}

export default ProductGrid
