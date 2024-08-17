'use client';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const pathname = usePathname();
  const isActive = pathname === '/buyer/home';

  const fetchProducts = async (query = '') => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = query
        ? `${backendUrl}/api/product/${query}`
        : `${backendUrl}/api/product`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main>
      <Navbar fetchProducts={fetchProducts} />
      <div className="flex ">
        <div className="flex flex-col bg-slate-100 h-screen min-w-40 text-center gap-4 rounded-r-md">
          <Link
            href={'/buyer/home'}
            className={`flex justify-center text-center mt-10 py-5 text-xl font-semibold cursor-pointer hover:text-white rounded-r-md fit ${
              isActive ? 'bg-blue-400' : 'bg-slate-500'
            }`}
          >
            Home
          </Link>
          <Link
            href={'/buyer/category'}
            className="text-xl py-5 font-semibold cursor-pointer hover:text-white flex justify-center text-center"
          >
            Category
          </Link>
        </div>
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
