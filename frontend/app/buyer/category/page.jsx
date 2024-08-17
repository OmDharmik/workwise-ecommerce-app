'use client';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';

const Catogory = () => {
  const pathname = usePathname();
  const isActive = pathname === '/buyer/category';
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
      <div className="flex">
        <div className="flex flex-col bg-slate-100 h-screen min-w-40 text-center gap-4 rounded-r-md">
          <Link
            href={'/buyer/home'}
            className="text-xl py-5 font-semibold cursor-pointer hover:text-white flex justify-center text-center"
          >
            Home
          </Link>
          <Link
            href={'/buyer/category'}
            className={`flex justify-center text-center mt-10 py-5 text-xl font-semibold cursor-pointer hover:text-white rounded-r-md fit ${
              isActive ? 'bg-blue-400' : 'bg-slate-500'
            }`}
          >
            Category
          </Link>
        </div>
      </div>
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
