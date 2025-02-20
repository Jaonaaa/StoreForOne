import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ProductType } from "@/services/types";
import { useProductStore } from "@/store/productStore";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { BadgeCheck, Trash } from "lucide-react";
import "./ProductDelete.sass";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/services/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { capitalizeFirstLetter } from "@/lib/utils";

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">Êtes-vous absolument sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut être annulée. Elle supprimera définitivement ce produit de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button
            disabled={isLoading}
            className="bg-red-600 transition-colors hover:bg-red-900 text-white"
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
