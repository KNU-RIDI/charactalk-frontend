import { api } from "@/api/instance"
import { CreateChatRoomRequest, CreateChatRoomResponse } from "@/types"

export const createChatRoom = async (
  request: CreateChatRoomRequest,
): Promise<CreateChatRoomResponse> => {
  try {
    const res = await api().post<CreateChatRoomResponse>("/chat-room", request)
    console.log("채팅방 생성 성공:", res.data)
    return res.data
  } catch (error) {
    console.error("채팅방 생성 실패:", error)
    throw error
  }
}
