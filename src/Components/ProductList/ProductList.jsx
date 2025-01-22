import React, { useState, useEffect } from 'react'
import { mockProducts } from '../../mockProductData'
import ProductGrid from '../ProductList/ProductGrid'
import ErrorMessage from '../ErrorMessage';

function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const mockData = false;

    useEffect(() => {
        if (mockData) {
            setProducts(mockProducts);
            setLoading(false);
        } else {
            // fetch data from your server here
            fetch(import.meta.env.VITE_API_URL + "/products")
                .then(response => response.json())
                .then(data => {

                    setProducts(data.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    setLoading(false);
                });
        }
    }, [mockData])

    if (loading) {
        return (
            <>
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array(8).fill(null).map((_, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow animate-pulse">
                                <div className="h-40 w-full bg-gray-300 mb-4"></div>
                                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                                <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
                                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div >
            </>
        )
    }

    return (
        <div className="p-6">
            <ErrorMessage />
            <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
            <ProductGrid products={products} />
        </div>
    )
}

export default ProductList
