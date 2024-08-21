'use client';
import BuyerLeftSideBar from '@/app/components/BuyerLeftSideBar';
import Navbar from '@/app/components/Navbar';
import ProductCard from '@/app/components/ProductCard';
import { useDebounce } from '@/app/hooks/hook';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Category = () => {
  const pathname = usePathname();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  async function handleSearch(category) {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching category:', error);
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-12">
        <BuyerLeftSideBar
          className="flex-2"
          pathname={pathname}
        ></BuyerLeftSideBar>
        <div className="h-screen w-full">
          <div className="flex flex-col">
            <div className="flex justify-center">
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-gray-300 rounded-md p-2 min-w-80 mt-10 mx-20 w-full shadow-md"
                placeholder="Search for Category (Clothes, Electronics,...)"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 m-5 p-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
