import { CalendarPlus, Home, LogOut, Computer, ClipboardClock, UserRoundCog, UsersRound, Wallet} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Gestión Usuarios",
    url: "/users",
    icon: UserRoundCog,
  },
    {
    title: "Gestion Clientes",
    url: "/clients",
    icon: UsersRound,
  },
  {
    title: "Gestion Equipos",
    url: "/equipments",
    icon: Computer,
  },
  {
    title: "Historial Servicios",
    url: "/services",
    icon: ClipboardClock,
  },
  {
    title: "Programacion Servicios",
    url: "/services/schedule",
    icon: CalendarPlus,
  },
  {
    title: "Gestion Cotizaciones",
    url: "/quotes",
    icon: Wallet,
  },
  {
    title: "Cerrar Sesion",
    url: "/",
    icon: LogOut,
  },

]

export function AppSidebar() {
  // Separar el ítem de "Cerrar Sesión"
  const mainItems = items.filter(item => item.title !== "Cerrar Sesion")
  const logoutItem = items.find(item => item.title === "Cerrar Sesion")

  return (
    <Sidebar>
      <SidebarContent className="h-full flex flex-col justify-between">
        {/* Parte superior: Menú principal */}
        <div>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Parte inferior: Cerrar Sesión */}
        {logoutItem && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={logoutItem.url}>
                  <logoutItem.icon />
                  <span>{logoutItem.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarContent>
    </Sidebar>
  )
}