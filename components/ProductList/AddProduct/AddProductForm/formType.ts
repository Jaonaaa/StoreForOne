import { z } from "zod";

const imageMimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];

const MAX_FILE_SIZE = 10000000;

const fileSchema = z
  .instanceof(File, { message: "Veuillez selectionner une image" })
  .refine((file) => file instanceof File, {
    message: "Invalid file. Please upload a valid image.",
  })
  .refine(
    (file) => {
      return imageMimeTypes.includes(file.type);
    },
    { message: "Le fichier doit est une image (jpeg, png, gif, webp)" }
  )
  .refine((file) => file.size < MAX_FILE_SIZE, "La taille maximale est de 10MB.");

export const formSchema = z.object({
  title: z.string().min(1, { message: "Veuillez entrer le nom de votre produit" }),
  description: z.string().min(1, { message: "Veuillez entrer une description de votre produit" }),
  price: z.coerce
    .number({})
    .positive({ message: "Veuillez entrer un prix valide" })
    .min(1, { message: "Le prix minimum d'un produit est 1.00 $" })
    .max(9999, { message: "Le prix maximum d'un produit est 9999.00 $" }),
  category: z.string().min(1, { message: "Veuillez choisir une catégorie" }),
  image: fileSchema,
});
