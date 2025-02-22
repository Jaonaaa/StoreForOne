import useEditProductForm from "@/hooks/useEditProductForm";
import { ProductType } from "@/services/types";
import { z } from "zod";
import { formSchemaEdit } from "../../ProductAdd/AddProductForm/formType";
import ProductForm from "../../ProductForm";

type EditProductFormProps = {
  closer: () => void;
  product: ProductType;
};

export default function EditProductForm({ closer, product }: EditProductFormProps) {
  const { categories, form, imageSrc, isLoading, setImageSrc, mutate } = useEditProductForm({ closer, product });

  async function onSubmit(data: z.infer<typeof formSchemaEdit>) {
    const newProduct: ProductType = {
      ...data,
      id: product.id,
      image: imageSrc!,
      rating: { ...product.rating },
    };
    mutate(newProduct);
  }

  return (
    <ProductForm
      categories={categories}
      form={form}
      formSchema={formSchemaEdit}
      imageSrc={imageSrc}
      isLoading={isLoading}
      setImageSrc={setImageSrc}
      onSubmit={onSubmit}
    />
  );
}
