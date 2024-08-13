"use client";
import CartCard from '@/components/CartCard';
import { useCart } from '@/components/CartContext';
import CartSummary from '@/components/CartSummary';
import { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';

const Cart: NextPage = () => {
  const { cart, removeFromCart, updateQuantity, calculateSubtotal } = useCart();
  const [discount, setDiscount] = useState<number | null>(null);
  const [discountCode, setDiscountCode] = useState<string>('');

  const subtotal = calculateSubtotal();
  const total = discount ? subtotal - discount : subtotal;

  const handleDiscountApply = () => {
    if (discountCode === 'SAVE10') {
      setDiscount(subtotal * 0.1); // 10% discount
    } else if (discountCode === 'SAVE50') {
      setDiscount(50); // Fixed $50 discount
    } else {
      setDiscount(null); // Invalid code, no discount
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/"><a className="text-blue-500 underline">Go back to shopping</a></Link></p>
      ) : (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6">
            {cart.map((item, index) => (
              <CartCard key={index} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            ))}
          </div>
          <CartSummary subtotal={subtotal} discount={discount} total={total} discountCode={discountCode} setDiscountCode={setDiscountCode} handleDiscountApply={handleDiscountApply} />
        </div>
      )}
    </div>
  );
};

export default Cart;
