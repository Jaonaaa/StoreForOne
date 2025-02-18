import { ProductType } from "@/services/types";
import { Star } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import "./ProductCard.sass";

type ProductCardProps = {
  product: ProductType;
};
export const ProductCard = ({ product }: ProductCardProps) => {
  const getDecimalStr = (num: number): string => {
    return String(Math.abs(num % 1).toFixed(2)).split(".")[1];
  };

  return (
    <div
      className="group aspect-6/9 h-[25rem] flex flex-col  overflow-hidden cursor-pointer"
      key={product.id}
      onClick={() => {
        console.log(product);
      }}
    >
      <div className=" w-full h-[calc(26rem-6rem)] flex justify-center items-center bg-[var(--card-bg)] relative overflow-clip">
        <Image
          className="w-[68%] group-hover:scale-[0.95] transition-transform duration-200  object-contain m-0 flex aspect-square mix-blend-multiply"
          width={400}
          height={600}
          draggable={false}
          src={product.image}
          priority
          alt={product.title}
        />
        <div
          className="absolute right-0 bottom-0 h-full w-full bg-[var(--card-h-bg)] pointer-events-none opacity-0
                  group-hover:opacity-100 transition-[opacity] duration-200"
        ></div>
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
  );
};

export default ProductCard;
