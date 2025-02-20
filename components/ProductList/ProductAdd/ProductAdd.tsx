import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddProductForm from "./AddProductForm";

export const ProductAdd = () => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = () => setSheetOpen(false);

  return (
    <>
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetTrigger asChild>
          <Button>
            <span className="ml-2">Ajouter un produit</span>
            <Plus size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Ajouter un produit</SheetTitle>
            <SheetDescription>Entrer les détails de votre produit ici. Cliquer confirmer quand vous avez finis.</SheetDescription>
          </SheetHeader>
          <AddProductForm closer={closeSheet} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductAdd;
