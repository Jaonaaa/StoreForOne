import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ArrowDownZA } from "lucide-react";
import "./OrderFilter.sass";
import { useState } from "react";

const orders: { label: string; value: "desc" | "asc" | undefined }[] = [
  {
    label: "Aucun",
    value: undefined,
  },
  {
    label: "A-Z",
    value: "asc",
  },
  {
    label: "Z-A",
    value: "desc",
  },
];

type OrderFilterProps = {
  reorder: (order: "desc" | "asc" | undefined) => void;
};

export const OrderFilter = ({ reorder }: OrderFilterProps) => {
  const [orderLabel, setOrderLabel] = useState<string | undefined>();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="ml-3 p-1 min-w-6 min-h-4 flex items-center justify-center rounded-sm cursor-pointer hover:bg-accent transition-[background]">
          <ArrowDownZA size={20} className="text-muted-foreground" />
          {orderLabel !== "Aucun" && orderLabel && (
            <span className={`ml-4 text-sm md:text-base text-foreground pr-2`}>Trier par : {orderLabel}</span>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          {orders.map((order) => {
            if ((!orderLabel && order.value == undefined) || (orderLabel == order.label && orderLabel == "Aucun")) return null;
            return (
              <DropdownMenuItem
                key={order.label}
                onClick={() => {
                  setOrderLabel(order.label);
                  reorder(order.value);
                }}
              >
                {order.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderFilter;
