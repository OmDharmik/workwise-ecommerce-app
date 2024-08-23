'use client';

import SellerNavbar from '@/app/components/SellerNavbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handlerAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.price = parseFloat(data.price);
    data.discount = parseFloat(data.discount);

    console.log(data);
    setLoading(true);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setSuccess('Product added successfully!');
        console.log(result);
      } else {
        console.error('Error:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SellerNavbar />
      <button
        className="bg-slate-200 p-3 rounded-md m-5 hover:bg-red-400 transition ease-in-out delay-150 hover:scale-110 duration-300"
        onClick={() => router.push('/seller/home')}
      >
        Back to Home
      </button>
      <h1 className="flex justify-center font-bold text-4xl p-3">
        Add Product
      </h1>
      <div className="flex flex-col">
        <div className="h-1/2 bg-slate-200 mx-5 rounded-md mt-5">
          <h2 className="font-semibold text-xl relative m-5">
            Product Information
          </h2>
          <form onSubmit={handlerAddProduct}>
            <div className="flex ">
              <div className="flex flex-col gap-5 mt-10 w-3/5 p-5">
                <input
                  name="name"
                  type="text"
                  className="p-3 rounded-md"
                  placeholder="Name"
                  required
                />
                <input
                  name="category"
                  type="text"
                  className="p-3 rounded-md"
                  placeholder="Category"
                  required
                />
                <input
                  name="price"
                  type="number"
                  className="p-3 rounded-md"
                  placeholder="Price"
                  required
                />
                <input
                  name="description"
                  type="text"
                  className="p-3 rounded-md"
                  placeholder="Description"
                />
                <input
                  name="discount"
                  type="number"
                  className="p-3 rounded-md"
                  placeholder="Discount"
                  required
                />
              </div>
              <div className="flex flex-col justify-center items-center w-2/5">
                <button
                  type="submit"
                  className="bg-blue-400 p-3 rounded-md transition ease-in-out hover:bg-green-600 delay-150 hover:scale-110 duration-300"
                >
                  {loading ? 'Adding...' : 'Add Product'}
                </button>
                {success && <p className="text-green-500 mt-2">{success}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
