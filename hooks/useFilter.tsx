import { ProductType } from "@/services/types";
import { useEffect, useState } from "react";

type Filter = {
  title: string;
  category: string;
  order: "desc" | "asc" | undefined;
};
function useFilter(productsInitial: ProductType[]) {
  const [productsFiltred, setProductsFiltred] = useState(productsInitial);
  const [filter, setFilter] = useState<Filter>({
    title: "",
    category: "", // we can use array to search mutiple categories
    order: undefined,
  });

  const filterByTitle = (title: string) => {
    setFilter((prevFilter) => ({ ...prevFilter, title }));
  };

  const orderBy = (products: ProductType[], order: "desc" | "asc" | undefined): ProductType[] => {
    if (order == null) return products;
    return [...products].sort((a, b) => (order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)));
  };

  const reorder = (order: "desc" | "asc" | undefined) => {
    setFilter((prevFilter) => ({ ...prevFilter, order: order }));
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
    // order by
    productsCopy = orderBy(productsCopy, filter.order);

    setProductsFiltred(productsCopy);
  };

  const reset = () => {
    setFilter({ title: "", category: "", order: "desc" });
    setProductsFiltred([...productsInitial]);
  };

  useEffect(() => {
    setProductsFiltred(productsInitial);
    filterProduct();
  }, [productsInitial]);

  useEffect(() => {
    filterProduct();
  }, [filter]);

  return { productsFiltred, filter, filterByTitle, filterByCategory, reorder, reset };
}

export default useFilter;
