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

const CartCard = ({ item, removeFromCart, updateQuantity,key }: { item: CartItem; removeFromCart: (id: number) => void; updateQuantity: (id: number, quantity: number) => void; key: number }) => {
  return (
    <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex">
                <Image src={item.image} alt={item.title} width={100} height={100} className="w-24 h-24 object-cover rounded-lg mr-4" />
                <div className="flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                  <p className="text-gray-700 text-sm">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded-lg mr-2"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border rounded-lg"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-lg ml-2"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md border-2 border-red-500 hover:bg-white hover:text-red-500 transition-all duration-300"
                  >
                    Remove Item
                  </button>
                </div>
              </div>
  )
}

export default CartCard