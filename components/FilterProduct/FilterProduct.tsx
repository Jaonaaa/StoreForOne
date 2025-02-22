"use client";
import { Input } from "@/components/ui/input";
import { throttle } from "@/lib/utils";
import ProductAdd from "../ProductList/ProductAdd";
import CategoryFilter from "./CategoryFilter";
import OrderFilter from "./OrderFilter";

type FilterProductProps = {
  filterByTitle: (title: string) => void;
  filterByCategory: (category: string) => void;
  reorder: (order: "desc" | "asc" | undefined) => void;
};
export const FilterProduct = ({ filterByCategory, filterByTitle, reorder }: FilterProductProps) => {
  //
  const handleSearch = throttle((text: string) => {
    filterByTitle(text);
  }, 500);

  return (
    <div className="w-full flex gap-2 pr-2 md:flex-row flex-col">
      <div className="flex gap-2 md:gap-2">
        <Input
          name="filter"
          className="max-w-[17rem] 
          text-sm md:text-base md:w-[13rem] lg:w-[20rem]"
          type="search"
          placeholder="Rechercher un produit"
          onInput={(e) => {
            handleSearch(e.currentTarget.value);
          }}
        />
        <CategoryFilter filterByCategory={filterByCategory} />
      </div>
      <div className="flex w-full mt-2 md:mt-0">
        <OrderFilter reorder={reorder} />
        <div className="flex w-fit gap-2 items-center ml-auto">
          <ProductAdd />
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
