import { formSchemaEdit } from "@/components/ProductList/ProductAdd/AddProductForm/formType";
import { updateProduct } from "@/services/api";
import { ProductType } from "@/services/types";
import { useProductStore } from "@/store/productStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "./use-toast";

const useEditProductForm = ({ closer, product }: { closer: () => void; product: ProductType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(product.image);
  const editProductStore = useProductStore((state) => state.updateProduct);
  const categories = useProductStore((state) => state.categories);
  const products = useProductStore((state) => state.products);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchemaEdit>>({
    resolver: zodResolver(formSchemaEdit),
    defaultValues: {
      category: product.category,
      description: product.description,
      price: product.price,
      title: product.title,
      image: product.image,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["productEdit"],
    mutationFn: async (product: ProductType) => {
      setIsLoading(true);
      const newProduct = await updateProduct(product.id.toString(), product);
      return { ...product, ...newProduct };
    },
    onSuccess: (data) => {
      editProductStore(data.id, data);
      edited();
      setIsLoading(false);
      closer();
      form.reset();
    },
  });

  const edited = () => {
    toast({
      title: "🎊 Produit modifié 🎊",
      description: (
        <div className="flex gap-2 items-center mt-2">
          <BadgeCheck size={28} className="text-white fill-[green]" />
          <p>Le produit a bien été modifié .</p>
        </div>
      ),
      duration: 2200,
    });
  };

  return { isLoading, setIsLoading, setImageSrc, imageSrc, categories, products, mutate, form };
};

export default useEditProductForm;
