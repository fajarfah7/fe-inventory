import { Sidebar } from "@/components/ui/sidebar"
import { AppSidebarHeader } from "@/layouts/sidebar/AppSidebarHeader"
import { AppSidebarFooter } from "@/layouts/sidebar/AppSidebarFooter"
import { AppSidebarContent } from "@/layouts/sidebar/AppSidebarContent"

export function AppSidebar() {
  return (
    <Sidebar>
      <AppSidebarHeader />
      <AppSidebarContent />
      <AppSidebarFooter />
    </Sidebar>
  )
}