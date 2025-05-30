import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getChatRoomList } from "@/api/ChatRoom/useGetChatRoomList"
import { createChatRoom } from "@/api/ChatRoom/useCreateChatRoom"
import { ChatRoomCardResponse, CreateChatRoomRequest, CreateChatRoomResponse } from "@/types"

export default function Sidebar() {
  const navigate = useNavigate()
  const [chatRooms, setChatRooms] = useState<ChatRoomCardResponse[]>([])
  const fetchChatRooms = async () => {
    try {
      const res = await getChatRoomList()
      setChatRooms(res)
    } catch (err) {
      console.error("채팅방 목록 조회 실패", err)
    }
  }

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
      await fetchChatRooms()
      navigate(`/chat/${res.chatRoomId}`)
    } catch (err) {
      console.error("채팅방 생성 실패", err)
    }
  }

  useEffect(() => {
    fetchChatRooms()
  }, [])

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
        {chatRooms.map((chat) => (
          <div
            key={chat.chatRoomId}
            onClick={() => navigate(`/chat/${chat.chatRoomId}`)}
            className="flex cursor-pointer items-center gap-2 px-0.5 hover:bg-gray-100"
          >
            <span className="text-bold w-2 text-center">{chat.chatRoomId}</span>
            <div className="mx-1">
              <img
                src={chat.characterImageUrl}
                alt={chat.characterName}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="flex-1">
              <div className="mt-1 mb-1 text-sm font-semibold">{chat.characterName}</div>
              <div className="text-xs text-gray-500">{chat.lastMessage}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes().toString().padStart(2, "0")
  const ampm = hour >= 12 ? "PM" : "AM"
  return `${hour}:${minute}${ampm}`
}
