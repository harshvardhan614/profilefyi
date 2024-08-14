"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import ProductGrid from '@/components/ProductGrid'



const Product = () => {
    const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto mt-10 flex flex-col items-center gap-6">
      <h1 className="text-2xl md:text-3xl font-semibold ">Hello {user.firstName}, Check our Product List</h1>
      <ProductGrid />
    </div>
  )
}

export default Product