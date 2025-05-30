import { api } from "@/api/instance"
import { RawMessage } from "@/types"

interface GetMessagesResponse {
  content: RawMessage[]
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

  console.log("📦 getMessages 응답:", res.data)
  return res.data
}
