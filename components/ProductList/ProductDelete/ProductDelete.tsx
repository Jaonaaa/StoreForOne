import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteProduct } from "@/services/api";
import { ProductType } from "@/services/types";
import { useProductStore } from "@/store/productStore";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { BadgeCheck, Trash } from "lucide-react";
import { useState } from "react";
import "./ProductDelete.sass";

type ProductDeleteProps = {
  product: ProductType;
  className?: string;
};

export const ProductDelete = ({ product, className = "" }: ProductDeleteProps) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const deleteProductFromStore = useProductStore((state) => state.deleteProduct);

  const handleDeleteProduct = async () => {
    setIsLoading(true);
    await deleteProduct(product.id.toString());
    deleteProductFromStore(product.id);
    deleted();
    setIsLoading(false);
    setOpenDialog(false);
  };

  const deleted = () => {
    toast({
      title: "🎊 Produit supprimé 🎊",
      description: (
        <div className="flex gap-2 items-center mt-2">
          <BadgeCheck size={28} className="text-white fill-red-600" />
          <p>
            Le produit <strong> {product?.title}</strong> a bien été supprimé dans la liste des produits
          </p>
        </div>
      ),
      duration: 2200,
    });
  };

  const DeleteAlert = () => (
    <AlertDialogTrigger asChild>
      <div
        className={`size-8 bg-red-400 p-2 rounded-sm flex justify-center items-center transition-colors hover:bg-red-600 duration-200 ${className}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Trash className="text-white" size={18} />
      </div>
    </AlertDialogTrigger>
  );
  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <DeleteAlert />
      <AlertDialogContent className=" max-md:w-[85%] max-md:rounded-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 text-base md:text-lg">Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription className="text-xs md:text-sm">
            Cette action ne peut être annulée. Elle supprimera définitivement ce produit (<strong>{product.title}</strong>) de nos
            serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center justify-center max-md:gap-4">
          <AlertDialogCancel className="text-xs md:text-sm max-md:mt-0">Annuler</AlertDialogCancel>
          <Button
            disabled={isLoading}
            className="bg-red-600 transition-colors hover:bg-red-900 text-white text-xs md:text-sm"
            onClick={handleDeleteProduct}
          >
            Supprimer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductDelete;
