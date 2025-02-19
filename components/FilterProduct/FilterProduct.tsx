"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";
import { capitalizeFirstLetter, throttle } from "@/lib/utils";
import { useProductStore } from "@/store/productStore";
import { ArrowDownZA, LayoutGrid, LayoutList } from "lucide-react";
import "./FilterProduct.sass";

type FilterProductProps = {
  filterByTitle: (title: string) => void;
  filterByCategory: (category: string) => void;
  filterByOrder?: (order: string) => void;
};
export const FilterProduct = ({ filterByCategory, filterByTitle }: FilterProductProps) => {
  const {} = useCategories();
  const categories = useProductStore((state) => state.categories);

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
      <Select
        onValueChange={(value) => {
          filterByCategory(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Catégories" />
        </SelectTrigger>
        <SelectContent side="bottom">
          <SelectItem value=" ">Toutes</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {capitalizeFirstLetter(category)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex w-fit gap-2 items-center ml-auto">
        <div className=" p-1 rounded-sm cursor-pointer hover:bg-accent transition-[background]">
          <ArrowDownZA size={20} className="text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
