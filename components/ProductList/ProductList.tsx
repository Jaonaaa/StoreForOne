"use client";
import FilterProduct from "@/components/FilterProduct";
import { fetchProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.sass";

export const ProductList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [open, setOpen] = useState(false);

  if (isPending || isError) {
    return <div>Loading... {error?.message}</div>;
  }

  return (
    <>
      <FilterProduct />

      <div
        className="mt-4 grid flex-1 w-full overflow-y-scroll  
          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
          grid-rows-none gap-4 max-h-[44rem] pb-4 pr-1 scroll-perso  "
      >
        {data.slice(0, 5).map((product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
