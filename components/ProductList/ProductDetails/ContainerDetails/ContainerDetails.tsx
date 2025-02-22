import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React from "react";

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
          className="focus-visible:outline-none [&>button]:hidden h-[100dvh] md:h-[99dvh] max-h-[100dvh] md:max-h-[99dvh]
          md:overflow-auto overflow-y-scroll
          ease-in-out p-0 border-[0] bg-none"
        >
          <div className="h-full w-full bg-background flex flex-col items-center pt-7 px-8 md:px-0">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ContainerDetails;
