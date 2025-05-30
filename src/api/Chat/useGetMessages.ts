import { api } from "@/api/instance"
import { Message } from "@/types"

interface GetMessagesResponse {
  content: Message[]
  hasNext: boolean
}

export const getMessages = async (
  chatRoomId: number,
  cursor?: number,
  size: number = 20,
): Promise<GetMessagesResponse> => {
  const res = await api().get<GetMessagesResponse>(`/chat-room/${chatRoomId}/chats`, {
    params: {
      cursor,
      size,
    },
  })
  return res.data
}
