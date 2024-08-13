"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Loader from './Loader';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            {loading ?
                <Loader/> :
                <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 px-2">
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
            }
        </>
    );
};

export default ProductGrid;
