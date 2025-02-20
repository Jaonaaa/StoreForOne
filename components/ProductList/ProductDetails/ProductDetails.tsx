import { SheetClose } from "@/components/ui/sheet";
import useProductDetails from "@/hooks/useProductDetails";
import { ProductType } from "@/services/types";
import { ShoppingCart, Star, X } from "lucide-react";
import ContainerDetails from "./ContainerDetails";
import "./ProductDetails.sass";
import { useEffect, useState } from "react";
import { getDecimalStr } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ProductDetailsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product?: ProductType;
  id?: number;
  type: "fetched" | "local";
};
export const ProductDetails = ({ open, setOpen, type, id, product }: ProductDetailsProps) => {
  const { data: currentProduct, isError, isPending, refetch } = useProductDetails({ type, id, product });
  const [imgLoaded, setImgLoaded] = useState(false);
  useEffect(() => {
    if (open) refetch();
  }, [open]);

  return (
    <ContainerDetails open={open} setOpen={setOpen}>
      <SheetClose asChild>
        <div
          className="size-[3.5rem] cursor-pointer flex items-center justify-center border border-[hsl(var(--foreground))] rounded-[50%]
                    transition-[transform,background] group origin-center hover:scale-110 hover:bg-foreground"
        >
          <X className="group-hover:text-background transition-colors" />
        </div>
      </SheetClose>
      <div className="w-full lg:max-w-[65vw]  grid grid-cols-1 lg:grid-cols-2 relative h-[75vh] mt-[3rem]">
        <div className="left w-full h-full bg-[var(--card-bg)] flex justify-center items-center relative">
          {!imgLoaded && <Skeleton className="w-full h-full z-[2] absolute inset-0" />}
          <img
            className="w-[75%] object-contain m-0 flex aspect-square mix-blend-multiply"
            src={currentProduct?.image}
            alt={currentProduct?.title}
            onLoad={() => {
              setImgLoaded(true);
            }}
            loading="lazy"
          />
        </div>
        <div className="right pl-[4vw] pt-[7rem] flex flex-col gap-7 pb-4">
          <h2 className="font-semibold text-3xl">{currentProduct?.title}</h2>
          <div>
            <p className="leading-7">{currentProduct?.description}</p>
          </div>

          <div className="price inline-flex items-baseline ">
            <span className="text-[2.75rem] ">$</span>
            <span className="text-[2.75rem]">{currentProduct && +currentProduct?.price.toString().split(".")[0]}</span>
            <span className="text-[2.75rem] ">
              {"."}
              {currentProduct && getDecimalStr(currentProduct?.price)}
            </span>
          </div>

          <Button className="w-fit text-lg p-7 rounded-none mt-5 ">
            Ajouter au panier <ShoppingCart className="!size-[1.2rem]" />
          </Button>

          <div className="review flex  gap-1 items-baseline mt-auto">
            <div className="text-gray-400 inline-flex gap-x-1">
              <span className="ml-1 text-base text-muted-foreground">{currentProduct?.rating.rate}</span>
              <Star size={22} className="text-[hsl(var(--sidebar-primary))]  fill-[hsl(var(--sidebar-primary))]" />
            </div>
            <span className="ml-1 text-base text-muted-foreground">{currentProduct?.rating.count} évaluations</span>
          </div>
        </div>

        <div className="title absolute"></div>
      </div>
    </ContainerDetails>
  );
};

export default ProductDetails;
