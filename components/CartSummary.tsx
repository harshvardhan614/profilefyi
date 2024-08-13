import React from 'react'

const CartSummary = ({ subtotal, discount, total, discountCode, setDiscountCode, handleDiscountApply }: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-[300px] lg:max-w-sm h-[400px] w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            {discount !== null && (
              <p className="text-lg text-green-500">Discount: -${discount.toFixed(2)}</p>
            )}
            <p className="text-xl font-bold mt-4">Total: ${total.toFixed(2)}</p>
            <div className="mt-4">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="w-full mb-2 px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleDiscountApply}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 transition-all duration-300"
              >
                Apply Discount
              </button>
            </div>
            <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md border-2 border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
  )
}

export default CartSummary