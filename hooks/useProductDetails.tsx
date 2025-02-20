import { fetchOneProducts } from "@/services/api";
import { ProductType } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

type useProductDetails = {
  product?: ProductType;
  id?: number;
  type: "fetched" | "local";
};

const useProductDetails = ({ type, product, id }: useProductDetails) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      //   if (type === "local") {
      return product;
      //   }
      //    PS: Si le produit avait vraiement été modifié dans le serveur on utiliserais cette méthode
      //   return await fetchOneProducts(id!.toString());
    },
    enabled: false,
  });
  return { data, isPending, isError, refetch };
};

export default useProductDetails;
