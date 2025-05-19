import { useNavigate } from "react-router-dom"
import { createChatRoom } from "@/api/ChatRoom/useCreateChatRoom"
import { CreateChatRoomRequest, CreateChatRoomResponse } from "@/types/index"

type Chat = {
  id: number
  name: string
  lastMessage: string
  time: string
  avatar: string
}

const ChatRooms: Chat[] = [
  {
    id: 1,
    name: "신데렐라",
    lastMessage: "최근 채팅 내용",
    time: "오후 1:35",
    avatar: "/images/cinderella.jpg",
  },
  {
    id: 2,
    name: "백설공주",
    lastMessage: "최근 채팅 내용",
    time: "오후 1:35",
    avatar: "/images/snowwhite.jpg",
  },
  {
    id: 3,
    name: "라푼젤",
    lastMessage: "최근 채팅 내용",
    time: "오후 1:35",
    avatar: "/images/rapunzel.jpg",
  },
  {
    id: 4,
    name: "앨리스",
    lastMessage: "최근 채팅 내용",
    time: "오후 1:35",
    avatar: "/images/alice.jpg",
  },
]

const handleCreateChatRoom = async () => {
  try {
    const request: CreateChatRoomRequest = {
      characterId: 1,
      name: "채팅방",
      type: "SINGLE",
    }
    const res: CreateChatRoomResponse = await createChatRoom(request)
    console.log("생성된 채팅방:", res.chatRoomId, res.character.name)
    //alert(`채팅방 생성 완료!\n이름: ${request.name}\n캐릭터: ${res.character.name}`)
  } catch (err) {
    console.error("채팅방 생성 실패", err)
  }
}

export default function Sidebar() {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen w-[260px] flex-col border-r bg-white p-4">
      <div className="mb-7 flex items-center justify-between px-1">
        <button onClick={() => navigate("/")}>
          <img src="/icons/home.svg" alt="/" className="h-6 w-6 hover:bg-gray-100" />
        </button>
        <button onClick={handleCreateChatRoom}>
          <img src="/icons/add.svg" alt="/" className="h-6 w-6 hover:bg-gray-100" />
        </button>
      </div>

      <div className="flex flex-col gap-8 overflow-y-auto">
        {ChatRooms.map((chat) => (
          <div
            key={chat.id}
            onClick={() => navigate("/chat")}
            className="flex items-center gap-2 px-0.5 hover:bg-gray-100"
          >
            <span className="text-bold w-2 text-center">{chat.id}</span>
            <div className="mx-1">
              <img src={chat.avatar} alt={chat.name} className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex-1">
              <div className="mt-1 mb-1 text-sm font-semibold">{chat.name}</div>
              <div className="text-xs text-gray-500">{chat.lastMessage}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xs text-gray-500">{chat.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
