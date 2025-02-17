import Header from "@/components/Header";
import Main from "@/components/Main";
import ProductList from "@/components/ProductList";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
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
