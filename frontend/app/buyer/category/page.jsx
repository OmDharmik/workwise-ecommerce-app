'use client';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

const Catogory = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProductsByCategory = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(
            `${backendUrl}/api/product/category/${query.trim()}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProducts(response.data.products);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      } else {
        setProducts([]);
      }
    }, 500), // Adjust debounce delay as needed (e.g., 500ms)
    [backendUrl]
  );

  useEffect(() => {
    fetchProductsByCategory(search);
    // Cleanup function to cancel the debounce timer if the component unmounts
    return () => {
      fetchProductsByCategory.cancel();
    };
  }, [search, fetchProductsByCategory]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search by Category</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        className="bg-gray-300 rounded-md p-2 mb-4 w-full"
        placeholder="Type category name..."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div>No products found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default Catogory;
