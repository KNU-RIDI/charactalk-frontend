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

const chatList = [
  {
    id: 1,
    name: "캐릭터 이름",
    message: "최근 채팅 내용",
    time: "오후 1:35",
    unreadCount: 3,
    avatar: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
  },
  {
    id: 2,
    name: "캐릭터 이름",
    message: "최근 채팅 내용",
    time: "오후 1:35",
    unreadCount: 3,
    avatar: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
  },
  {
    id: 3,
    name: "캐릭터 이름",
    message: "최근 채팅 내용",
    time: "오후 1:35",
    unreadCount: 3,
    avatar: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
  },
  {
    id: 4,
    name: "캐릭터 이름",
    message: "최근 채팅 내용",
    time: "오후 1:35",
    unreadCount: 3,
    avatar: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
  },
  {
    id: 5,
    name: "캐릭터 이름",
    message: "최근 채팅 내용",
    time: "오후 1:35",
    unreadCount: 3,
    avatar: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64 bg-white">
      <SidebarHeader className="flex flex-row items-center justify-between border-b px-5.5 py-3.5">
        <button>
          <img src="/icons/home.svg" alt="/" className="h-6 w-6" />
        </button>
        <button>
          <img src="/icons/add.svg" alt="/" className="h-6 w-6" />
        </button>
      </SidebarHeader>
      <SidebarContent className="h-auto">
        <SidebarGroup className="flex h-auto flex-col">
          <SidebarGroupContent className="flex-1">
            <SidebarMenu>
              {chatList.map((chat, index) => (
                <SidebarMenuItem key={chat.id} className="p-1 hover:bg-gray-100">
                  <SidebarMenuButton asChild>
                    <a href="#" className="flex h-full items-center gap-3">
                      {/* 채팅 번호 */}
                      <span className="text-md text-gray-400">{index + 1}</span>
                      {/* 프로필 이미지 */}
                      <img src={chat.avatar} alt={chat.name} className="h-9 w-9 rounded-full" />
                      {/* 이름 + 최근 채팅 내용 */}
                      <div className="flex flex-1 flex-col gap-1.5">
                        <div className="text-[13.5px]">{chat.name}</div>
                        <div className="text-[11px] text-gray-400">{chat.message}</div>
                      </div>
                      {/* 시간 + 알림 개수 */}
                      <div className="flex flex-col items-end">
                        <div className="text-[10px] text-gray-400">{chat.time}</div>
                        {chat.unreadCount > 0 && (
                          <span className="mt-1.5 rounded-full bg-blue-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
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
