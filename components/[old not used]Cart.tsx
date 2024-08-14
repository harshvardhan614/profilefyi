"use client";
import { NextPage } from 'next';
import { useCart } from '../components/CartContext';
import Link from 'next/link';
import Image from 'next/image';

const Cart: NextPage = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/"><a className="text-blue-500 underline">Go back to shopping</a></Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
              <p className="text-gray-700 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
              <p className="text-gray-900 font-bold mt-2">Total: ${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md border-2 border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Total Amount: ${total.toFixed(2)}</h2>
          <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
