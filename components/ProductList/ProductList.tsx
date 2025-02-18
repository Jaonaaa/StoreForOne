"use client";
import FilterProduct from "@/components/FilterProduct";
import useProducts from "@/hooks/useProducts";
import ProductCard from "./ProductCard";
import { Skeleton } from "../ui/skeleton";
import "./ProductList.sass";

export const ProductList = () => {
  const { data, isPending } = useProducts();

  const Placeholders = () => (
    <div className="container-list">
      {[...Array(10).keys()].map((key) => (
        <div className="h-[25rem] " key={key}>
          <Skeleton className="w-full h-full" />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <FilterProduct />
      {isPending ? (
        <Placeholders />
      ) : (
        <div className="container-list">
          {data?.map((product) => (
            <ProductCard product={product} key={product?.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
