import { Sidebar } from "@/components/ui/sidebar"
import { AppSidebarHeader } from "@/layouts/sidebar/AppSidebarHeader"
import { AppSidebarFooter } from "@/layouts/sidebar/AppSidebarFooter"
import { AppSidebarContent } from "@/layouts/sidebar/AppSidebarContent"

export function AppSidebar({ className }: { className?: string }) {
  return (
    <Sidebar collapsible="icon" className={className}>
      <AppSidebarHeader />
      <AppSidebarContent className="md:h-full max-h-screen" />
      <AppSidebarFooter />
    </Sidebar>
  )
}