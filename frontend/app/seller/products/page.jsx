'use client';

import SellerLeftSideBar from '@/app/components/SellerLeftSideBar';
import SellerNavbar from '@/app/components/SellerNavbar';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Products = () => {
  const pathname = usePathname();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response?.data?.products;
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <SellerNavbar />
      <div className="flex flex-12">
        <SellerLeftSideBar pathname={pathname} className="flex flex-2" />
        <div className="h-screen w-full">
          <div className="container mx-auto p-4">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {products.map((product) => {
                return (
                  <div className="flex flex-col justify-center">
                    <div
                      key={product.id}
                      className="bg-slate-200 flex flex-col items-center box-border h-60 w-60 p-4 border-4 rounded-md"
                    >
                      <div className="box-border h-48 w-48">
                        <Image
                          src={'/product-image.jpeg'}
                          alt="product"
                          layout="fill"
                          className="object-contain"
                        />
                      </div>
                      <div>{product.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
