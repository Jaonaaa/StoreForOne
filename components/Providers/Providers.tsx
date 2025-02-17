import { ReactNode } from "react";
import ThemeProvider from "./ThemeProvider";
import QueryProvider from "./QueryProvider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange enableColorScheme>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
