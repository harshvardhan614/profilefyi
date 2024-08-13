import ProductCard from "@/components/ProductCard";
import React from "react";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ProductCard
        image="https://picsum.photos/300/200"
        name="Sample Product"
        description="Sample description"
        price={29.99}
      />
    </div>
  );
}
