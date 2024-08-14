"use client";
import { useAuth } from '@clerk/nextjs';
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
    updateQuantity: (id: number, quantity: number) => void;
    isInCart: (id: number) => boolean;
    cartCount: number;
  calculateSubtotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoaded, userId } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);


  useEffect(() => {
      if (isLoaded && userId) {
          // Load cart from database when user is authenticated
          fetch('/api/cart/load')
              .then(res => res.json())
              .then(data => setCart(data.cart));
      }
  }, [isLoaded, userId]);

  useEffect(() => {
      if (isLoaded && userId) {
          // Save cart to localStorage and database whenever it changes
          localStorage.setItem('cart', JSON.stringify(cart));
          fetch('/api/cart/save', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cart }),
          });
      }
  }, [cart, isLoaded, userId]);

    const addToCart = (product: CartItem) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
          updateQuantity(product.id, existingProduct.quantity + 1);
        } else {
          setCart((prevCart) => [...prevCart, product]);
        }
      };

    const removeFromCart = (id: number) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prevCart) =>
          prevCart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
          )
        );
        if(quantity ==0){
            removeFromCart(id);
        }
      };

    const isInCart = (id: number) => {
        return cart.some(item => item.id === id);
    };

    const cartCount = cart.length;

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      };

    return (
        <CartContext.Provider value={{ cart, addToCart,updateQuantity, removeFromCart, isInCart, cartCount, calculateSubtotal }}>
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
