import Image from 'next/image';
import React, { useState } from 'react';
import { useCart } from './CartContext';

interface ProductCardProps {
    key: number;
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, description, price, id }) => {
    const { addToCart, removeFromCart, isInCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = async () => {
        try {
            const alreadyInCart = await isInCart(id);
            if (alreadyInCart) {
                await removeFromCart(id);
                setAdded(false);
            } else {
                await addToCart({ id, title: name, price, image, description, quantity: 1 });
                setAdded(true);
            }
        } catch (error) {
            console.error("An error occurred while updating the cart:", error);
        }
    };
    
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden" key={id}>
            <Image src={image} alt={name} width={300} height={300} className="w-full h-60 object-cover" />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900">{name.length > 20 ? name.slice(0, 20) + '...' : name}</h2>
                <p className="text-foreground  text-[12px] text-justify">{description.length > 50 ? description.slice(0, 50) + '...' : description}</p>
                <p className="text-gray-700 text-sm mb-4">₹{price.toFixed(2)}</p>
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-2 px-4 rounded-md border-2 transition-all duration-300 ${isInCart(id).then(result => {
                        
                        if (result) {
                            return 'bg-gray-500 text-white border-gray-500 hover:bg-white hover:text-gray-500';
                        } else {
                            return 'bg-red-500 text-white border-red-500 hover:bg-white hover:text-red-500';
                        }
                    }).catch(error => {
                        console.error("An error occurred while updating the cart:", error);
                    })}}`}
                >
                    {isInCart(id).then(result => {
                        return result ? 'Remove from Cart' : 'Add to Cart';
                    })}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
