import { Home, Inbox } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Chat", url: "#", icon: Inbox },
  { title: "Chat", url: "#", icon: Inbox },
  { title: "Chat", url: "#", icon: Inbox },
  { title: "Chat", url: "#", icon: Inbox },
  { title: "Chat", url: "#", icon: Inbox },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <a href="/" className="flex items-center gap-2 p-2">
          <img src="/icons/home.svg" alt="Home" className="h-6 w-6" />{" "}
          <span className="text-lg font-semibold"></span>
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel></SidebarGroupLabel>
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
    </Sidebar>
  )
}
