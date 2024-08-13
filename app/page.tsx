"use client";
// import CartCounter from "@/components/CartCounter";
// import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import React from "react";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center py-8">Product Listing</h1>
      <ProductGrid />
      {/* <CartCounter /> */}
    </>
  );
}
