'use client';

import DeleteModal from '@/app/components/DeleteModal';
import SellerLeftSideBar from '@/app/components/SellerLeftSideBar';
import SellerNavbar from '@/app/components/SellerNavbar';
import axios from 'axios';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Products = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

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

  const handleDeleteClick = (productId) => {
    setProductIdToDelete(productId);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${productIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productIdToDelete)
      );
    } catch (error) {
      console.log('Error deleting product:', error);
    } finally {
      setModalOpen(false);
      setProductIdToDelete(null);
    }
  };

  return (
    <div>
      <SellerNavbar />
      <div className="flex flex-12">
        <SellerLeftSideBar pathname={pathname} className="flex flex-2" />
        <div className="h-screen w-full">
          <div className="container mx-auto p-4">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  router.push('/seller/add-product');
                }}
                className="transition ease-in-out p-3 rounded-md delay-150 bg-green-300 hover:scale-110 hover:bg-green-500 duration-300 mr-10 hover:shadow-md"
              >
                Add Product
              </button>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div className="flex justify-center mt-5" key={product.id}>
                  <div className="bg-slate-200 flex flex-col items-center box-border h-60 w-60 p-4 border-4 rounded-md">
                    <div className="box-border h-48 w-48 relative">
                      <Image
                        src={'/product-image.jpeg'}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>
                    <div className="mt-2 text-center">{product.name}</div>
                    <div className="flex gap-5 p-2 mt-3">
                      <button
                        onClick={() =>
                          router.push(`/seller/edit/${product.id}`)
                        }
                        className="bg-blue-400 p-2 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
                        className="bg-red-400 p-2 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Products;
