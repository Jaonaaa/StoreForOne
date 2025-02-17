import { ReactNode } from "react";
import "./Main.sass";

type MainProps = {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
};
export const Main = ({ children, subtitle, title }: MainProps) => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ml-4 mt-5">
      <div className="rounded-xl  ">
        <div className="mb-2 flex items-start justify-between space-y-2 flex-col">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm mt-0 my-0 text-muted-foreground"> {subtitle}</p>
        </div>
      </div>
      {children && <div className="flex-col flex min-h-[100vh] flex-1 rounded-xl  md:min-h-min">{children}</div>}
    </div>
  );
};

export default Main;
