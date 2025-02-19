import { ProductType } from "@/services/types";
import { useEffect, useState } from "react";

function useFilter(productsInitial: ProductType[]) {
  const [productsFiltred, setProductsFiltred] = useState(productsInitial);
  const [filter, setFilter] = useState({
    title: "",
    category: "", // we can use array to search mutiple categories
    priceMin: 0,
    priceMax: 9999,
    order: "desc",
  });

  const filterByTitle = (title: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, title }));
  };

  const byTitle = (products: ProductType[], title: string): ProductType[] => {
    if (title.trim() === "") return products;
    const lowercasedText = title.toLowerCase();
    return products.filter((product) => product.title.toLowerCase().includes(lowercasedText));
  };

  const filterByCategory = (category: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, category }));
  };

  const byCategory = (products: ProductType[], category: string): ProductType[] => {
    if (category.trim() === "") return products;
    return products.filter((product) => product.category == category);
  };

  const filterProduct = () => {
    let productsCopy = [...productsInitial];
    // by title
    productsCopy = byTitle(productsCopy, filter.title);
    // by category
    productsCopy = byCategory(productsCopy, filter.category);

    setProductsFiltred(productsCopy);
  };

  //   const reset = () => {
  //     setFilter({ title: "", category: "", priceMin: 0, priceMax: 9999, order: "desc" });
  //     setProductsFiltred([...productsInitial]);
  //   };

  useEffect(() => {
    setProductsFiltred(productsInitial);
  }, [productsInitial]);

  useEffect(() => {
    filterProduct();
  }, [filter]);

  return { productsFiltred, filter, filterByTitle, filterByCategory };
}

export default useFilter;
