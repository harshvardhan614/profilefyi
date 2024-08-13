"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
    key: number;
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        };

        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 p-6">
            {products.slice(0, 10).map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    name={product.title}
                    price={product.price}
                    description={product.description}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
