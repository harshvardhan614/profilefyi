"use client";
import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartContext';

const Cart: NextPage = () => {
    const { cart,updateQuantity, removeFromCart, calculateSubtotal } = useCart();
    const subtotal = calculateSubtotal();
    return (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          {cart.length === 0 ? (
            <p>Your cart is empty. <Link href="/" className="text-blue-500 underline">Go back to shopping</Link></p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                  <Image src={item.image} alt={item.title} width={300} height={300} className="w-full h-48 object-cover mb-4 rounded-lg" />
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  {/* <p className="text-gray-700 text-sm">₹{item.price.toFixed(2)} x {item.quantity}</p> */}
                  <p className="text-gray-900 font-bold mt-2">Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-lg mr-2"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border rounded-lg"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-lg ml-2"
                    >
                      +
                    </button>
                  </div>
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
              <h2 className="text-2xl font-semibold">Total Amount: ₹ {subtotal.toFixed(2)}</h2>
              <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      );
    };
    
    export default Cart;