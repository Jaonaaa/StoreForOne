import { fetchCategories } from "@/services/api";
import { useProductStore } from "@/store/productStore";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const setCategories = useProductStore((state) => state.setCategories);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      let res = await fetchCategories();
      setCategories(res);
      return res;
    },
  });

  return { data, isPending, isError, error };
};

export default useCategories;
