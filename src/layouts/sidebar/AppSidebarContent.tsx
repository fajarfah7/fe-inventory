import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
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
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Item",
    url: "/item",
    icon: Inbox,
  },
  {
    title: "Warehouse",
    url: "/warehouse",
    icon: Calendar,
  },
  {
    title: "Rack",
    url: "/rack",
    icon: Search,
  },
  {
    title: "Customer",
    url: "/customer",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]


export function AppSidebarContent() {
  return (
    <>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      </SidebarContent>
    </>
  );
};