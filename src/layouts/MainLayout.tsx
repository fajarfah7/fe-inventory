import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/AppSidebar";

export function MainLayout() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-3xl md:w-full flex flex-col">
          <div>
            <SidebarTrigger />
          </div>
          <div className="w-full p-2">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
};