'use client';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SellerLeftSideBar from '../../components/SellerLeftSideBar';
import SellerNavbar from '../../components/SellerNavbar';

const SellerHomePage = () => {
  const [products, setProducts] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response?.data?.products);
    };
    fetchData();
  }, []);

  return (
    <main>
      <SellerNavbar />
      <div className="flex flex-12">
        <SellerLeftSideBar pathname={pathname} />
        <div className="w-full h-screen m-4">
          <div className="flex flex-3 justify-evenly">
            <div className="bg-slate-200 flex flex-col text-center items-center box-border h-48 w-48 p-4 border-4 rounded-md">
              <div>Total Products</div>
              <h1 className="text-3xl mt-4">{products.length}</h1>
            </div>
            <div className="bg-slate-200 flex flex-col items-center box-border h-48 w-48 p-4 border-4 rounded-md">
              <div>Orders</div>
              <h1 className="text-3xl mt-4">5</h1>
            </div>
            <div className="bg-slate-200 flex flex-col items-center box-border h-48 w-48 p-4 border-4 rounded-md">
              <div>Earnings</div>
              <h1 className="text-3xl mt-4">5</h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SellerHomePage;
