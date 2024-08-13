"use client";
import React from 'react';
import { useCart } from './CartContext';

const CartCounter: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
      {cartCount}
    </div>
  );
};

export default CartCounter;