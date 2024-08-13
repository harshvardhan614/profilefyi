"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  title: string;
  description: string;
  quantity: number;
  price: number;
  image: string;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const cartCount = cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
