"use client";
import FilterProduct from "@/components/FilterProduct";
import useIsMobileTouch from "@/hooks/use-mobile-touch";
import useFilter from "@/hooks/useFilter";
import useProducts from "@/hooks/useProducts";
import { useProductStore } from "@/store/productStore";
import { motion } from "motion/react";
import PlaceholderProducts from "./PlaceholderProducts";
import ProductCard from "./ProductCard";
import { variantsProductList } from "./variants";
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
        <motion.div
          variants={variantsProductList}
          animate="show"
          initial="hidden"
          className="container-list"
          viewport={{ once: false }}
        >
          {productsFiltred?.map((product) => (
            <ProductCard product={product} key={product?.id} isMobile={isMobile} />
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ProductList;
