import { fetchProducts } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { data, isPending, isError, error };
};

export default useProducts;
