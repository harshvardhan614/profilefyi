// File: components/ProductCard.tsx

import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name,description, price }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <Image src={image} alt={name} width={200} height={200} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <p className="text-foreground  text-[12px] text-justify">{description}</p>
        <p className="text-gray-700 text-sm mb-4">${price.toFixed(2)}</p>
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md border-2 border-red-500 transition-all duration-300 hover:bg-white hover:text-red-500">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
