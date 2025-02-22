import useAddProductForm from "@/hooks/useAddProductForm";
import { randomNumber } from "@/lib/utils";
import { NewProductType } from "@/services/types";
import { z } from "zod";
import ProductForm from "../../ProductForm";
import { formSchema } from "./formType";

type AddProductFormProps = {
  closer: () => void;
};

// TODO: Refactor this
export default function AddProductForm({ closer }: AddProductFormProps) {
  const { categories, form, imageSrc, isLoading, setImageSrc, mutate } = useAddProductForm({ closer: closer });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const newProduct: NewProductType = {
      ...data,
      image: imageSrc!,
      rating: {
        count: +randomNumber(10, 400).toFixed(0),
        rate: +randomNumber(0.1, 5).toFixed(1),
      },
    };
    mutate(newProduct);
  }

  return (
    <ProductForm
      categories={categories}
      form={form}
      formSchema={formSchema}
      imageSrc={imageSrc}
      isLoading={isLoading}
      setImageSrc={setImageSrc}
      onSubmit={onSubmit}
    />
  );
}
