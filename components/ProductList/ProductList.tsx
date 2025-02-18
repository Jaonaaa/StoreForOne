"use client";
import FilterProduct from "@/components/FilterProduct";
import useProducts from "@/hooks/useProducts";
import { useProductStore } from "@/store/productStore";
import { Skeleton } from "../ui/skeleton";
import ProductCard from "./ProductCard";
import "./ProductList.sass";

export const ProductList = () => {
  const { isPending } = useProducts();
  const products = useProductStore((state) => state.products);

  const Placeholders = () => (
    <div className="container-list">
      {[...Array(10).keys()].map((key) => (
        <div className="h-[25rem] w-full " key={key}>
          <Skeleton className="w-full h-full " />
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
          {products?.map((product) => (
            <ProductCard product={product} key={product?.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
