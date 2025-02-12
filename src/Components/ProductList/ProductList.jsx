import React, { useState, useEffect } from 'react'
import { mockProducts } from '../../mockProductData'
import ProductGrid from '../ProductList/ProductGrid'
import ErrorMessage from '../ErrorMessage';
import { fetchAllProducts } from '../../api';
import SuccessMessage from '../SuccessMessage';

function ProductList() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const mockData = false;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (mockData) {
                    setProducts(mockProducts);
                } else {
                    const response = await fetchAllProducts();
                    setProducts(response);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [mockData]);


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
            <SuccessMessage />
            <ErrorMessage />
            <h1 className="text-2xl font-bold mb-6">Product Listing</h1>
            <ProductGrid products={products} />
        </div>
    )
}

export default ProductList
