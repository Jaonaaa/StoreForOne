import Header from "@/components/Header";
import Main from "@/components/Main";
import ProductList from "@/components/ProductList";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Main title="Accueil" subtitle="Voici la liste des produits disponibles chez StoreForOne">
          <ProductList />
        </Main>
      </SidebarInset>
    </SidebarProvider>
  );
}
