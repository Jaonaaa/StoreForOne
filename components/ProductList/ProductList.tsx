"use client";
import FilterProduct from "@/components/FilterProduct";
import { fetchProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import "./ProductList.sass";

export const ProductList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending || isError) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FilterProduct />
      <div
        className="mt-4 grid flex-1 w-full overflow-y-scroll  
          grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
          grid-rows-none gap-4 max-h-[44rem] pb-4 pr-1 scroll-perso  "
      >
        {data.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
