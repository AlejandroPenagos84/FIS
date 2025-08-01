import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        {/* Sidebar lateral */}
        <AppSidebar />

        {/* Contenido principal a la derecha del sidebar */}
        <div className="flex flex-col flex-1 overflow-hidden w-full">
          <SidebarTrigger className="bg-white!" />
          <div className="flex flex-1 overflow-y-auto p-4  justify-center">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
