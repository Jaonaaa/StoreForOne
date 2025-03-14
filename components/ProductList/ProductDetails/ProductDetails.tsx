import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useProductDetails from "@/hooks/useProductDetails";
import { getDecimalStr } from "@/lib/utils";
import { ProductType } from "@/services/types";
import { ShoppingCart, Star, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ContainerDetails from "./ContainerDetails";
import { variantsBlurImage, variantsProductDetails, variantsTextDetails, variantsTextHideDetails } from "./variants";
import Magnet from "@/components/Magnet";

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
  const delay = 0.3;
  useEffect(() => {
    if (open) refetch();
  }, [open]);

  return (
    <ContainerDetails open={open} setOpen={setOpen}>
      <Magnet padding={65} disabled={false} magnetStrength={2.5}>
        <SheetClose asChild>
          <div
            className="size-[2.8rem] md:size-[3.5rem]
          cursor-pointer flex items-center justify-center border border-[hsl(var(--foreground))] rounded-[50%]
          transition-[transform,background] group origin-center hover:scale-110 hover:bg-foreground"
          >
            <X className="group-hover:text-background transition-colors md:size-[24px] size-5" />
          </div>
        </SheetClose>
      </Magnet>

      <motion.div
        className="w-full lg:max-w-[65vw] md:px-4  grid grid-cols-1 md:grid-cols-2 relative h-[75vh] mt-[3rem]"
        variants={variantsProductDetails}
        initial="hidden"
        animate="show"
        exit={"exit"}
        onAnimationComplete={() => {
          console.log("animation complete");
        }}
      >
        {/* LEFT */}
        <div className="left w-full h-full bg-[var(--card-bg)] flex justify-center items-center relative">
          {!imgLoaded && <Skeleton className="w-full h-full z-[2] absolute inset-0" />}
          <motion.img
            variants={variantsBlurImage}
            custom={delay}
            className="w-[65%] md:w-[75%] py-5 md:py-0 object-contain m-0 flex aspect-square mix-blend-multiply"
            src={currentProduct?.image}
            alt={currentProduct?.title}
            onLoad={() => {
              setImgLoaded(true);
            }}
            loading="lazy"
          />
        </div>
        {/* RIGHT */}
        <div className="right pl-[0] md:pl-[4vw] pt-[3.5rem] md:pt-[7rem] flex flex-col gap-5 md:gap-7 pb-4">
          <h2 className="font-semibold text-xl md:text-3xl overflow-hidden">
            <motion.span
              className="inline-block"
              variants={variantsTextDetails}
              custom={delay + 0.3}
              onAnimationComplete={() => {
                console.log("Animation head");
              }}
            >
              {currentProduct?.title}
            </motion.span>
          </h2>
          <div className="overflow-hidden">
            <motion.p className="leading-5 text-xs md:leading-7" variants={variantsTextHideDetails} custom={delay + 0.5}>
              {currentProduct?.description}
            </motion.p>
          </div>
          <div className="price inline-flex items-baseline overflow-hidden">
            <motion.span custom={delay + 0.65} variants={variantsTextDetails} className="text-[2rem] md:text-[2.75rem] ">
              $
            </motion.span>
            <motion.span custom={delay + 0.65} variants={variantsTextDetails} className="text-[2rem] md:text-[2.75rem]">
              {currentProduct && +currentProduct?.price.toString().split(".")[0]}
            </motion.span>
            <motion.span custom={delay + 0.65} variants={variantsTextDetails} className="text-[2rem] md:text-[2.75rem] ">
              {"."}
              {currentProduct && getDecimalStr(currentProduct?.price)}
            </motion.span>
          </div>

          <SheetClose asChild>
            <motion.div variants={variantsTextHideDetails} custom={delay + 0.7}>
              <Button className="w-fit text-[0.92rem] md:text-lg p-7 rounded-none mt-1 md:mt-5 group relative overflow-hidden">
                <span className="z-[1]">Ajouter au panier</span>
                <span className="z-[1]">
                  <ShoppingCart className="!size-[1rem] md:!size-[1.2rem]" />
                </span>
                <span className="size-6 bg-[hsl(var(--sidebar-primary))] z-0 rounded-[50%] absolute left-[-2rem] top-[0.8rem] group-hover:scale-[35] transition-transform duration-300" />
              </Button>
            </motion.div>
          </SheetClose>

          <motion.div className="review flex  gap-1 items-baseline mt-auto" variants={variantsTextHideDetails} custom={delay + 0.9}>
            <div className="text-gray-400 inline-flex gap-x-1">
              <span className="ml-1  text-sm md:text-base text-muted-foreground">{currentProduct?.rating.rate}</span>
              <Star className="size-[16px] md:size-[22px] text-[hsl(var(--sidebar-primary))]  fill-[hsl(var(--sidebar-primary))]" />
            </div>
            <span className="ml-1  text-sm md:text-base text-muted-foreground">{currentProduct?.rating.count} évaluations</span>
          </motion.div>
        </div>

        <div className="title absolute"></div>
      </motion.div>
    </ContainerDetails>
  );
};

export default ProductDetails;
