import Image from 'next/image'
import React from 'react'

export interface CartItem {
    id: number;
    title: string;
    description: string;
    quantity: number;
    price: number;
    image: string;
}

const CartCard = ({ item, removeFromCart, updateQuantity, key }: { item: CartItem; removeFromCart: (id: number) => void; updateQuantity: (id: number, quantity: number) => void; key: number }) => {
    return (
        <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center mb-4">
            <Image src={item.image} alt={item.title} width={100} height={100} className="w-32 h-32 object-cover rounded-lg mr-4" />
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-900">{item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}</h2>
                <p className="text-foreground  text-[12px] text-justify">{item.description.length > 30 ? item.description.slice(0, 30) + '...' : item.description}</p>
                <p className="text-gray-700 text-md font-bold">${item.price.toFixed(2)}</p>
                <div className="flex flex-col lg:flex-row justify-between gap-4">

                    <div className="flex items-center ">
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 bg-gray-200 rounded-lg mr-2"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={item.quantity}
                            readOnly
                            className="w-12 text-center border rounded-lg py-2"
                        />
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 bg-gray-200 rounded-lg ml-2"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-full max-w-sm bg-red-500 text-white py-2 px-4 rounded-md border-2 border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300"
                    >
                        Remove Item
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CartCard