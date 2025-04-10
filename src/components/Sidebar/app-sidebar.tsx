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
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"

const chatList = [
  /* 더미데이터(나중에 삭제) */
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

type Chat = {
  id: number
  name: string
  message: string
  time: string
  unreadCount: number
  avatar: string
}

function ChatItem({ chat, index, onClick }: { chat: Chat; index: number; onClick: () => void }) {
  return (
    <SidebarMenuItem className="p-1 hover:bg-gray-100">
      <SidebarMenuButton asChild>
        <button onClick={onClick} className="flex h-full items-center gap-3">
          <span className="text-md text-gray-400">{index + 1}</span>
          <img src={chat.avatar} alt={chat.name} className="h-9 w-9 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <div className="text-[13.5px]">{chat.name}</div>
            <div className="text-[11px] text-gray-400">{chat.message}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[10px] text-gray-400">{chat.time}</div>
            {chat.unreadCount > 0 && (
              <span
                style={{ backgroundColor: "#1E9EFF" }}
                className="mt-1.5 rounded-full px-1.5 py-0.5 text-xs font-semibold text-white"
              >
                {chat.unreadCount}
              </span>
            )}
          </div>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export function AppSidebar() {
  const navigate = useNavigate()
  return (
    <Sidebar className="h-screen w-64 bg-white">
      <SidebarHeader className="flex flex-row items-center justify-between border-b px-5.5 py-3.5">
        <button onClick={() => navigate("/")}>
          <img src="/icons/home.svg" alt="/" className="h-6 w-6 hover:bg-gray-100" />
        </button>
        <button>
          <img src="/icons/add.svg" alt="/" className="h-6 w-6" />
        </button>
      </SidebarHeader>
      <SidebarContent className="h-auto">
        <ScrollArea className="h-full">
          <SidebarGroup className="flex h-auto flex-col">
            <SidebarGroupContent className="flex-1">
              <SidebarMenu>
                {chatList.map((chat, index) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    index={index}
                    onClick={() => navigate("/chat")}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
