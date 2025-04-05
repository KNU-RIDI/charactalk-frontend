import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen">
      {/* 사이드바 */}
      <SidebarProvider>
        <AppSidebar />
        <div className="relative flex flex-1 flex-col overflow-hidden">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </div>
  )
}
