"use client";
import User from '@/modals/user.modal';
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
    isInCart: (id: number) => Promise<boolean>;
    cartCount: number;
    calculateSubtotal: () => number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isLoaded, userId } = useAuth();
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        if (isLoaded && userId) {
            fetch('/api/cart/load')
                .then(res => res.json())
                .then(data => setCart(data.cart));
        }
    }, [isLoaded, userId]);

    useEffect(() => {
        if (isLoaded && userId) {
            localStorage.setItem('cart', JSON.stringify(cart));
            fetch('/api/cart/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cart }),
            });
        }
    }, [cart, isLoaded, userId]);

    const addToCart = async (item: CartItem) => {
        if (!userId) return;
        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { $push: { cart: item } },
            { new: true, upsert: true }
        );
        setCart(user.cart);
    };

    const removeFromCart = async (itemId: number) => {
        if (!userId) return;
        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { $pull: { cart: { id: itemId } } },
            { new: true }
        );
        setCart(user.cart);
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        if (!userId) return;
        const updatedCart = cart.map(item =>
            item.id === itemId ? { ...item, quantity: Math.max(0, quantity) } : item
        );
        setCart(updatedCart);

        if (quantity === 0) {
            await removeFromCart(itemId);
        } else {
            const item = updatedCart.find(item => item.id === itemId);
            if (item) {
                await addToCart(item);
            }
        }
    };

    const isInCart = async (itemId: number): Promise<boolean> => {
        if (!userId) return false;
        const user = await User.findOne({ clerkId: userId });
        return user ? user.cart.some((item: CartItem) => item.id === itemId) : false;
    };

    const cartCount = cart.length;

    const calculateSubtotal = () => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, isInCart, cartCount, calculateSubtotal }}>
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
