"use client";
import FilterProduct from "@/components/FilterProduct";
import useIsMobileTouch from "@/hooks/use-mobile-touch";
import useFilter from "@/hooks/useFilter";
import useProducts from "@/hooks/useProducts";
import { useProductStore } from "@/store/productStore";
import PlaceholderProducts from "./PlaceholderProducts";
import ProductCard from "./ProductCard";
import "./ProductList.sass";

export const ProductList = () => {
  const { isPending } = useProducts();
  const products = useProductStore((state) => state.products);
  const { productsFiltred, filterByTitle, filterByCategory, reorder } = useFilter(products);
  const isMobile = useIsMobileTouch();
  return (
    <>
      <FilterProduct filterByCategory={filterByCategory} filterByTitle={filterByTitle} reorder={reorder} />
      {isPending ? (
        <PlaceholderProducts />
      ) : productsFiltred.length == 0 ? (
        <div className="container-no-result">
          <h4>Aucun résultat</h4>
        </div>
      ) : (
        <div className="container-list">
          {productsFiltred?.map((product) => (
            <ProductCard product={product} key={product?.id} isMobile={isMobile} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
