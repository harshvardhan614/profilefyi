"use client";

import React, { useState, useMemo } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from './CartContext';


const CartSummary: React.FC = () => {
  const { calculateSubtotal } = useCart();

  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountError, setDiscountError] = useState<string | null>(null);

  const subtotal = calculateSubtotal();

  // Calculate discount and total
  const discount = useMemo(() => {
    if (discountCode === 'SAVE10') {
      return subtotal * 0.1;
    } else if (discountCode === 'SAVE50') {
      return subtotal * 0.5;
    } else {
      return null;
    }
  }, [discountCode, subtotal]);

  const total = subtotal - (discount || 0);

  const handleDiscountApply = () => {
    if (!discount) {
      setDiscountError('Invalid discount code');
    } else {
      setDiscountError(null);
      toast.success('Discount applied successfully!');
    }
  };

  const handleCheckout = () => {
    toast.success('Checkout successful!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[300px] lg:max-w-sm h-[400px] w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
      <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
      {discountError && <p className="text-lg text-red-500">{discountError}</p>}
      {discount && !discountError && (
        <p className="text-lg text-green-500">Discount: -${discount.toFixed(2)}</p>
      )}
      <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
      <div className="mt-4">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Discount code-SAVE10, SAVE50"
          className="w-full mb-2 px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleDiscountApply}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-300"
        >
          Apply Discount
        </button>
      </div>
      <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300"
      >
        Proceed to Checkout
      </button>
      <Toaster />
    </div>
  );
};

export default CartSummary;