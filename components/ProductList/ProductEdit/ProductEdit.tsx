import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductType } from "@/services/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import EditProductForm from "./EditProductForm";

type ProductEditProps = {
  product: ProductType;
};
export const ProductEdit = ({ product }: ProductEditProps) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <div
            className={`size-8 bg-green-500 p-2 rounded-sm flex justify-center items-center transition-colors hover:bg-green-700 duration-200 `}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Pencil className="text-white" size={18} />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Modifier un produit</SheetTitle>
            <SheetDescription>
              Entrer les nouveaux détails de votre produit ici. Cliquer confirmer quand vous avez finis.
            </SheetDescription>
          </SheetHeader>
          <EditProductForm closer={closeSheet} product={product} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductEdit;
