import React, { useState, useEffect } from 'react'
import Loader from '../Components/Loader';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../api'
import axios from 'axios';
import SuccessMessage from '../Components/SuccessMessage';
import { useDispatch } from 'react-redux';
import { setSuccessMessage } from '../Redux/Slice/PopUpMessageSlice';

function ProductDetailsPage() {
  // const product = {
  //     productImage: "https://res.cloudinary.com/dczmaqwot/image/upload/v1736931310/bzdjkht1mljkzlqfqzl8.jpg",
  //     price: 123.33,
  //     stock: 32,
  //     createdAt: "2025-01-15T14:25:11.315505",
  //     updatedAt: "2025-01-17T11:55:14.947451",
  //     description: "This is a test Product",
  //     id: 6,
  //     productName: "test1",
  //   };

  /*USE THIS CODE WHEN YOU HAVE ID COMING FROM THE API*/
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  useEffect(() => {
    // Scroll to the top of the page on initial load
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetchProductById(id); // Await the async function

        if (!response) {
          console.error('No response received');
          navigate('/page-not-found'); // Redirect to the error page if no response
          return;
        }

        // Check if the API call was successful
        if (response.success && response.data) {
          setProduct(response.data); // Update product state with the data
        } else {
          console.error('Error fetching product:', response.message);
          navigate('/page-not-found'); // Redirect to the error page if no response
        }

        setLoading(false); // Stop loading indicator
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false); // Ensure loading is stopped even if an error occurs
      }
    };

    fetchProduct(); // Call the inner async function
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async (id) => {
    // console.log('Add to cart button clicked with Id: ' + id);
    setLoading(true);
    await axios.post(
      baseUrl + '/cart/add',
      id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // Ensure the server knows the payload is JSON
        }
      }).then((response) => {
        if(response.status === 200){
          console.log(response.data)
          dispatch(setSuccessMessage(response.data.message));
        }
      }).catch((error) => {
        console.error('Error adding product to cart:', error.message);
      }).finally(()=>{
        setLoading(false);
      })

  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <SuccessMessage />
      {loading && <Loader />} {/* Show loader while loading */}
      <div className="flex flex-col md:flex-row">
        {/* Left Section: Product Image */}
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section: Product Details */}
        <div className="md:w-1/2 md:pl-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.productName}</h1>
          <p className="text-xl text-gray-700 mb-4">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            <strong>Stock:</strong> {product.stock} available
          </p>

          {/* Product Description */}
          <p className="text-base text-gray-800 mb-6">
            <strong>Description:</strong> {product.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            {/* Created At and Last Updated */}
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
              <p><strong>Last Updated:</strong> {new Date(product.updatedAt).toLocaleDateString()}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-4 sm:mt-0 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Information Sections */}
      <div className="mt-12 space-y-12">
        {/* About the Product Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this Product</h2>
          <p className="text-base text-gray-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugiat rerum voluptates! Deleniti pariatur eum hic sed exercitationem, accusamus quasi! Soluta, sit. Eum saepe ea optio doloremque nobis, sunt consectetur?
          </p>
        </div>

        {/* FAQs Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div key="key1" className="border-b py-3">
              <p className="text-lg text-gray-700 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis explicabo facilis saepe expedita, ea natus nostrum ullam, quos beatae quas temporibus praesentium, iste impedit vero cumque ex porro vitae illo.
              </p>
              <p className="text-base text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint placeat veniam libero harum maxime, similique culpa? Id eum rerum labore explicabo nemo laudantium vitae, animi facere, non veniam, blanditiis officia!</p>
            </div>
            <div key="key3" className="border-b py-3">
              <p className="text-lg text-gray-700 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis explicabo facilis saepe expedita, ea natus nostrum ullam, quos beatae quas temporibus praesentium, iste impedit vero cumque ex porro vitae illo.
              </p>
              <p className="text-base text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint placeat veniam libero harum maxime, similique culpa? Id eum rerum labore explicabo nemo laudantium vitae, animi facere, non veniam, blanditiis officia!</p>
            </div>
            <div key="key2" className="border-b py-3">
              <p className="text-lg text-gray-700 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis explicabo facilis saepe expedita, ea natus nostrum ullam, quos beatae quas temporibus praesentium, iste impedit vero cumque ex porro vitae illo.
              </p>
              <p className="text-base text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint placeat veniam libero harum maxime, similique culpa? Id eum rerum labore explicabo nemo laudantium vitae, animi facere, non veniam, blanditiis officia!</p>
            </div>
          </div>
        </div>

        {/* Other Information Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Other Information</h2>
          <p className="text-base text-gray-800">lorem</p>
        </div>
      </div>
    </div>

  );
}

export default ProductDetailsPage
