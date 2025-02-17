import ThemeSwicther from "@/components/ThemeSwicther";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import "./Header.sass";

const data = {
  user: {
    name: "Jaona Ferdinah",
    email: "jaona@dev.me",
    avatar: "https://avatars.githubusercontent.com/u/111148723?v=4",
  },
};

export const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Produits</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex ml-auto flex-row gap-3">
          <ThemeSwicther />
          <Avatar className="h-8 w-8 rounded-3xl">
            <AvatarImage src={data.user.avatar} alt={data.user.name} />
            <AvatarFallback className="rounded-lg">JF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
