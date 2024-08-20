'use client';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="h-screen">
      <h1 className="text-center m-2 p-5 text-3xl font-bold">Your Cart</h1>

      <div className="flex font-semibold mx-10 my-5 p-5 justify-between border-b ">
        <h3 className="flex-1">Item</h3>
        <h3 className="flex-1 text-center">Price</h3>
        <h3 className="flex-1 text-center">Quantity</h3>
        <h3 className="flex-1 text-right">Total</h3>
      </div>

      <div>
        {cart.map((product, index) => (
          <div key={index} className="flex justify-between my-5 mx-10 p-5">
            <div className="flex-1">{product.name}</div>
            <div className="flex-1 text-center">Rs {product.price}</div>
            <div className="flex-1 text-center">
              <div className="flex justify-center gap-4">
                <button onClick={() => removeFromCart(product)}>-</button>
                {product.quantity}
                <button onClick={() => addToCart(product)}>+</button>
              </div>
            </div>
            <div className="flex-1 text-right">
              Rs {product.price * product.quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between my-5 mx-10 p-5 border-t font-semibold">
        <div className="flex-1">Total</div>
        <div className="flex-1"></div>
        <div className="flex-1"></div>
        <div className="flex-1 text-right">Rs {totalAmount}</div>
      </div>
    </div>
  );
};

export default CartPage;
