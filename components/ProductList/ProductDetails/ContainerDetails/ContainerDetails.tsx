import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React from "react";
import "./ContainerDetails.sass";

type ContainerDetailsProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
};
export const ContainerDetails = ({ open, setOpen, children }: ContainerDetailsProps) => {
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetHeader className="hidden">
          <SheetTitle>{""}</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <SheetContent
          side={"bottom"}
          className="focus-visible:outline-none [&>button]:hidden h-[99vh] ] ease-in-out p-0 border-[0] bg-none"
        >
          <div className="h-full w-full bg-background flex flex-col items-center pt-7">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ContainerDetails;
