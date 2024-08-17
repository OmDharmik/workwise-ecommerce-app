'use client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import Navbar from '../../components/Navbar';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data.products);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, backendUrl]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex">
          <div className="w-1/2">
            <div className="bg-gray-400 w-full h-full"></div>
          </div>
          <div className="w-1/2 pl-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl mb-4">{product.description}</p>
            <p className="text-2xl font-bold mb-4">Rs{product.price}</p>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
