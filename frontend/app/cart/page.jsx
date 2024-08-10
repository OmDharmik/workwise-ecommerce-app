'use client';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Group products by ID and count quantities
  const groupedCartItems = cart.reduce((acc, product) => {
    if (!acc[product.id]) {
      acc[product.id] = { ...product, quantity: 1 };
    } else {
      acc[product.id].quantity += 1;
    }
    return acc;
  }, {});

  const cartItems = Object.values(groupedCartItems);

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul>
        {cartItems.map((product) => (
          <li
            key={product.id}
            className="flex justify-between items-center mb-4"
          >
            <span>{product.name}</span>
            <span>
              Rs {product.price} x {product.quantity}
            </span>
            <button
              onClick={() => removeFromCart(product.id)}
              className="bg-red-500 text-white p-2 rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="flex">
        <button
          onClick={clearCart}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md mr-5"
        >
          Clear Cart
        </button>
        <Link
          href="/checkout"
          className="mt-4 bg-green-500 text-white p-2 rounded-md"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
