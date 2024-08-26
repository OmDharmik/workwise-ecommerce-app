'use client';

import SellerNavbar from '@/app/components/SellerNavbar';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data['price'] = parseFloat(data['price']);
    data['discount'] = parseFloat(data['discount']);

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/edit/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <SellerNavbar />
      <button
        className="bg-slate-200 cursor:pointer p-3 rounded-md m-5 hover:bg-red-400 transition ease-in-out delay-150 hover:scale-110 duration-300"
        onClick={() => router.push('/seller/home')}
      >
        Back to Home
      </button>
      <h1 className="flex justify-center font-bold text-4xl p-3">
        Edit Product
      </h1>
      <div className="flex flex-col">
        <div className="h-1/2 bg-slate-200 mx-5 rounded-md mt-5">
          <h2 className="font-semibold text-xl relative m-5">
            Product Information
          </h2>
          <form onSubmit={handleEditProduct}>
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
                  Update Item
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
