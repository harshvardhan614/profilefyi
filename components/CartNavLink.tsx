"use client"
import Link from 'next/link'
import React from 'react'
import { useCart } from './CartContext';

const CartNavLink = () => {
    const { cartCount } = useCart();
    return (
        <Link href="/cart" className="relative">
            <span>Cart</span>
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
                    {cartCount}
                </span>
            )}
            <span />
        </Link>
    )
}

export default CartNavLink