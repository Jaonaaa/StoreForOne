import { useProductStore } from "@/store/productStore";
import { useState } from "react";
import { useToast } from "./use-toast";
import { useMutation } from "@tanstack/react-query";
import { addProducts } from "@/services/api";
import { NewProductType } from "@/services/types";
import { BadgeCheck } from "lucide-react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/components/ProductList/ProductAdd/AddProductForm/formType";
import { z } from "zod";

const useAddProductForm = ({ closer }: { closer: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>();
  const addProductStore = useProductStore((state) => state.addProduct);
  const categories = useProductStore((state) => state.categories);
  const products = useProductStore((state) => state.products);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["product"],
    mutationFn: async (product: NewProductType) => {
      setIsLoading(true);
      const newProduct = await addProducts(product);
      return { ...product, id: newProduct.id + products.length };
    },
    onSuccess: (data) => {
      addProductStore(data);
      added(data);
      setIsLoading(false);
      closer();
      form.reset();
    },
  });

  const added = (product: NewProductType) => {
    toast({
      title: "🎊 Produit ajouté 🎊",
      description: (
        <div className="flex gap-2 items-center mt-2">
          <BadgeCheck size={28} className="text-white fill-[green]" />
          <p>
            Le produit <strong> {product?.title}</strong> - <strong>{capitalizeFirstLetter(product?.category)}</strong> a bien été
            ajouté dans la liste des produits{" "}
          </p>
        </div>
      ),
      duration: 2200,
    });
  };

  return { isLoading, setIsLoading, setImageSrc, imageSrc, categories, products, mutate, form };
};

export default useAddProductForm;
