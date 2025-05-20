import { api } from "@/api/instance"
import { ChatRoomDetail } from "@/types"

export const getChatRoomDetail = async (chatRoomId: number): Promise<ChatRoomDetail> => {
  try {
    const res = await api().get<ChatRoomDetail>(`/chat-room/${chatRoomId}`)
    console.log("채팅방 조회 성공:", res.data)
    return res.data
  } catch (error) {
    console.error("채팅방 조회 실패:", error)
    throw error
  }
}
