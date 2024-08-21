'use client';
import BuyerLeftSideBar from '@/app/components/BuyerLeftSideBar';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const pathname = usePathname();

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
        <BuyerLeftSideBar pathname={pathname} />
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
