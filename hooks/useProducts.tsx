import { fetchProducts } from "@/services/api";
import { useProductStore } from "@/store/productStore";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const setProducts = useProductStore((state) => state.setProducts);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      let res = await fetchProducts();
      setProducts(res);
      return res;
    },
  });

  return { data, isPending, isError, error };
};

export default useProducts;
