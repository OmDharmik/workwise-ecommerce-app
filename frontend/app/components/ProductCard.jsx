'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="flex flex-col border p-2 rounded-md shadow-md">
      <div className="relative w-full h-48 justify-center items-center">
        <Image
          src={'/product-image.jpeg'}
          layout="fill"
          className="object-contain"
        ></Image>
      </div>
      <div className="flex flex-col m-5 items-center">
        <h2 className="text-xl">{product.name}</h2>
        <p className="font-semibold">Rs {product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
