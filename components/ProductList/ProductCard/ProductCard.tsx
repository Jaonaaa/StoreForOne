import { Separator } from "@/components/ui/separator";
import { getDecimalStr } from "@/lib/utils";
import { ProductType } from "@/services/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductDelete from "../ProductDelete";
import ProductDetails from "../ProductDetails";
import ProductEdit from "../ProductEdit";
import "./ProductCard.sass";

type ProductCardProps = {
  product: ProductType;
  isMobile?: boolean;
};

type statusProduct = {
  product?: ProductType;
  id?: number;
  type: "fetched" | "local";
};

export const ProductCard = ({ product, isMobile }: ProductCardProps) => {
  const [open, setOpen] = useState(false);
  // Pour vois les details des produits en ligne en recupere via Fake store API et pour les
  // produits en local em récupere tout simplement le produit dans la liste
  // PS: Si le produit avait vraiement été modifié dans le serveur on utiliserais cette méthode
  // const details: statusProduct = product.id > 20 ? { type: "local", product } : { id: product.id, type: "fetched" };
  const details: statusProduct = { type: "local", product, id: product.id };

  const viewDescription = () => setOpen(true);

  return (
    <>
      <ProductDetails open={open} setOpen={setOpen} {...details} />
      <div className="group aspect-5/9 h-[25rem] flex flex-col w-full relative  overflow-hidden max-w-[23rem]" key={product.id}>
        <div
          className="group/container w-full cursor-pointer h-[calc(26rem-6rem)] flex justify-center items-center bg-[var(--card-bg)] relative overflow-clip"
          onClick={viewDescription}
        >
          <Image
            className="w-[68%] group-hover/container:scale-[0.9] transition-transform duration-200  object-contain m-0 flex aspect-square mix-blend-multiply"
            width={400}
            height={600}
            draggable={false}
            src={product.image}
            priority
            alt={product.title}
          />
          <div className="absolute right-0 bottom-0 h-full w-full bg-[var(--card-h-bg)] pointer-events-none opacity-0 group-hover:opacity-100 transition-[opacity] duration-200" />
        </div>
        <div
          className={`absolute right-2 bottom-[7rem] z-[2] flex gap-2 pointer-events-none transition-all group-hover:opacity-100  group-hover:pointer-events-auto
            opacity-100 sm:opacity-0
          ${isMobile ? "opacity-100" : "opacity-0"}
          `}
        >
          <ProductEdit product={product} />
          <ProductDelete product={product} />
        </div>
        <div className="text-sm mt-2 min-h-[6rem] flex flex-col gap-[0.15rem]">
          <h6 className="text-sm font-semibold mt-2 line-clamp-1 text-ellipsis  mb-1"> {product.title}</h6>
          <div className="review flex  gap-1 items-center">
            <div className="text-gray-400 inline-flex gap-x-1">
              <span className="ml-1 text-muted-foreground">{product.rating.rate}</span>
              <Star size={16} className="text-[hsl(var(--sidebar-primary))] translate-y-[0.1rem] fill-[hsl(var(--sidebar-primary))]" />
            </div>
            <Separator orientation="vertical" />
            <span className="ml-1 text-muted-foreground">{product.rating.count} évaluations</span>
          </div>
          <div className="price inline-flex items-center mt-1">
            <span className="text-2xl mr-1 text-muted-foreground">$</span>
            <span className="text-[1.75rem]">{+product.price.toString().split(".")[0]}</span>
            <span className="text-base text-muted-foreground mt-auto">
              {"."}
              {getDecimalStr(product.price)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
