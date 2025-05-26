import { api } from "@/api/instance"
import { ChatRoomCardResponse } from "@/types"

export const getChatRoomList = async (): Promise<ChatRoomCardResponse[]> => {
  try {
    const res = await api().get<ChatRoomCardResponse[]>("/chat-room")
    console.log("채팅방 목록 조회 성공", res)
    return res.data
  } catch (err) {
    console.error("채팅방 목록 조회 실패", err)
    throw err
  }
}
