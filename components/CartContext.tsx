"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    removeFromCart: (id: number) => void;
    isInCart: (id: number) => boolean;
    cartCount: number;
  }
  
  const CartContext = createContext<CartContextProps | undefined>(undefined);
  
  export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        if (typeof window !== 'undefined') {
          const savedCart = localStorage.getItem('cart');
          return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
      });
    
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);
  
    const addToCart = (product: CartItem) => {
      setCart((prevCart) => [...prevCart, product]);
    };
  
    const removeFromCart = (id: number) => {
      setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };
  
    const isInCart = (id: number) => {
      return cart.some(item => item.id === id);
    };
  
    const cartCount = cart.length;
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, cartCount }}>
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
