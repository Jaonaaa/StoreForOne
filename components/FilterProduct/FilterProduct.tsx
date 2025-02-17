"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import "./FilterProduct.sass";

export const FilterProduct = () => {
  return (
    <div className="w-fit flex flex-row gap-2">
      <Input name="filter" className="max-w-[17rem]" type="search" placeholder="Rechercher un produit" />
      <Select
        onValueChange={(e) => {
          console.log(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent side="bottom">
          <SelectItem value="Claire">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterProduct;
