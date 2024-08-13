
import ProductGrid from "@/components/ProductGrid";
import React from "react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto  mt-10 flex flex-col gap-6 px-2 items-center justify-center">
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <ProductGrid />
    </div>
  );
}
