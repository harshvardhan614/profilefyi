"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from './CartContext';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-md ">
      <div className="flex items-center w-full max-w-7xl justify-between px-4 py-2 text-md mx-auto z-50">
        {/* logo */}
        <Link href="/" className="cursor-pointer">
          <Image src="/profileLogo.svg" alt=" logo" className="w-[100px] sm:w-[120px] rounded-full" width={70} height={70} />
        </Link>
          <Link href="/cart" className="relative">
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartCount}
              </span>
            )}
          <span/>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
