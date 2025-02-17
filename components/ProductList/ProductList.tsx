"use client";
import FilterProduct from "@/components/FilterProduct";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api";
import "./ProductList.sass";

export const ProductList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending || isError) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FilterProduct />
      <div
        className="mt-4 grid flex-1 w-full  overflow-y-scroll  
        grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
       grid-rows-none gap-4 max-h-[44rem] pb-2 pr-1 scroll-perso "
      >
        {data.map((product, key) => (
          <div className="aspect-6/9 h-[21.5rem] flex flex-col justify-center items-center bg-slate-300 overflow-hidden" key={key}>
            <div className="w-full h-[calc(21.5rem-4rem)] flex justify-center items-center">
              {/* <img className="w-full object-cover " src={product.image} alt={product.title} /> */}
            </div>
            <div className="text-sm mt-2 min-h-[4rem]">{product.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
