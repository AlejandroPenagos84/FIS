// src/layouts/AppLayout.tsx
import { AppSidebar } from "@/components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function AppLayout() {
    return (
        <main className="flex h-screen w-full">
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger className="bg-white!"/>
                </main>
            </SidebarProvider>
            {/* Render the nested routes here */}
            <Outlet />
        </main>
    );
}