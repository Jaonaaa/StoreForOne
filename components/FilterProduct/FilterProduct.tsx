"use client";
import { Input } from "@/components/ui/input";
import { throttle } from "@/lib/utils";
import { ArrowDownZA } from "lucide-react";
import AddProduct from "../ProductList/AddProduct";
import CategoryFilter from "./CategoryFilter";
import "./FilterProduct.sass";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
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
    <div className="w-full flex flex-row gap-2 pr-2">
      <Input
        name="filter"
        className="max-w-[17rem]"
        type="search"
        placeholder="Rechercher un produit"
        onInput={(e) => {
          handleSearch(e.currentTarget.value);
        }}
      />
      <CategoryFilter filterByCategory={filterByCategory} />
      <OrderFilter reorder={reorder} />
      <div className="flex w-fit gap-2 items-center ml-auto">
        <AddProduct />
      </div>
    </div>
  );
};

export default FilterProduct;
