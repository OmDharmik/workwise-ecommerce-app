'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SellerNavbar from '../../components/SellerNavbar';

const SellerHomePage = () => {
  const [products, setProducts] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <SellerNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Products</h1>
        <Link
          href="/seller/add-product"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mb-4 inline-block"
        >
          Add New Product
        </Link>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center mb-4 border-b pb-2"
              >
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p>{product.category}</p>
                  <p>{product.description}</p>
                  <p className="font-bold">Rs {product.price}</p>
                  <p className="text-sm text-gray-600">
                    Discount: {product.discount}%
                  </p>
                </div>
                <div>
                  <Link
                    href={`/seller/edit-product/${product.id}`}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={async () => {
                      try {
                        const token = localStorage.getItem('token');
                        await axios.delete(
                          `${backendUrl}/api/product/${product.id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );
                        setProducts((prevProducts) =>
                          prevProducts.filter((p) => p.id !== product.id)
                        );
                      } catch (error) {
                        console.error('Error deleting product:', error);
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div>No products found.</div>
          )}
        </ul>
      </div>
    </main>
  );
};

export default SellerHomePage;
