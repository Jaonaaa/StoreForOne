import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { capitalizeFirstLetter } from "@/lib/utils";
import { addProducts } from "@/services/api";
import { NewProductType } from "@/services/types";
import { useProductStore } from "@/store/productStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Upload } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formType";

type AddProductFormProps = {
  closer: () => void;
};

export default function AddProductForm({ closer }: AddProductFormProps) {
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const newProduct: NewProductType = {
      ...data,
      image: imageSrc!,
      rating: {
        count: 0,
        rate: 0,
      },
    };
    const idNewProduct = await addProducts(newProduct);
    addProductStore({ ...newProduct, id: idNewProduct.id + products.length });
    added(newProduct);
    setIsLoading(false);
    closer();
    form.reset();
  }

  const added = (product: NewProductType) => {
    toast({
      title: "🎊 Produit ajouté 🎊",
      description: (
        <div className="flex gap-2 items-center mt-2">
          <BadgeCheck size={28} className="text-white fill-[green]" />
          <p>
            Le produit
            {product?.title} - {capitalizeFirstLetter(product?.category)} a bien été ajouté dans la liste des produits{" "}
          </p>
        </div>
      ),
      duration: 60000,
    });
  };

  return (
    <div className="grid gap-4 py-4 flex-1 overflow-y-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-[0.05rem]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre produit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description de votre produit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel> Catégorie</FormLabel>
                <Select onValueChange={field.onChange} name="category" defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionne une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {capitalizeFirstLetter(category)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Prix</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem className="mb-3">
                <h6 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"> Photo </h6>
                <FormLabel
                  htmlFor="image"
                  className="input-product w-full h-[17rem] aspect-6/9 border-[2px] cursor-pointer rounded-sm flex items-center justify-center flex-col
                  transition-all hover:bg-[var(--file-background)]
                  "
                >
                  {imageSrc ? (
                    <div className=" w-full h-full flex justify-center items-center bg-[var(--file-background)] relative overflow-clip">
                      <img src={imageSrc} alt="Image de votre produit" className=" w-[75%] object-contain m-0 flex aspect-square  " />
                    </div>
                  ) : (
                    <>
                      <span className="mb-4">
                        <Upload className="text-sm text-muted-foreground" />
                      </span>
                      <span className="text-sm text-muted-foreground">Uploader un fichier</span>
                    </>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...fieldProps}
                    id="image"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setImageSrc(imageUrl);
                      }
                      return onChange(event.target.files && event.target.files[0]);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-3" type="submit" disabled={isLoading}>
            Confirmer
          </Button>
        </form>
      </Form>
    </div>
  );
}
