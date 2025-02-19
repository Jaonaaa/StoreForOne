import { Skeleton } from "../../ui/skeleton";

export const PlaceholderProducts = () => {
  return (
    <div className="container-list ">
      {[...Array(10).keys()].map((key) => (
        <div className="h-[25rem] w-full relative" key={key}>
          <Skeleton className="w-full h-full " />
          <div className="absolute bottom-[19%] w-[95%] h-3 rounded-sm left-2">
            <Skeleton className="w-full h-full " />
          </div>
          <div className="absolute bottom-[13%] w-[40%] h-3 rounded-sm left-2">
            <Skeleton className="w-full h-full " />
          </div>
          <div className="absolute bottom-[3%] w-[30%] h-7 rounded-sm left-2">
            <Skeleton className="w-full h-full " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaceholderProducts;
