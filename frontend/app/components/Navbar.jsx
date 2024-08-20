'use client';
import { useCart } from '@/context/CartContext';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

const Navbar = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { cart } = useCart();

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (query.trim()) {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(
            `${backendUrl}/api/product/name/${query}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setSearchResults(response.data.products);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    }, 1000),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    debouncedSearch(query);
  };

  return (
    <div className="relative flex justify-between min-h-10 items-center border">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={150}
        className="m-3 p-2"
      />
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="bg-gray-300 rounded-md p-2 min-w-80 shadow-md"
          placeholder="Search for products..."
        />
        {searchResults.length > 0 && (
          <div className="absolute left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-10">
            {searchResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="block p-2 hover:bg-gray-200"
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-4 mr-5 font-bold cursor-pointer ">
        <Link href="/cart" className="hover:bg-blue-500 rounded-md p-2">
          Cart ({cart.length})
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
