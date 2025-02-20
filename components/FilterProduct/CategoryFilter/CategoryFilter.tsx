import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useProductStore } from "@/store/productStore";
import "./CategoryFilter.sass";

type CategoryFilterProps = {
  filterByCategory: (text: string) => void;
};

export const CategoryFilter = ({ filterByCategory }: CategoryFilterProps) => {
  const {} = useCategories();
  const categories = useProductStore((state) => state.categories);
  return (
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
  );
};

export default CategoryFilter;
