import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange enableColorScheme>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
