import { api } from "@/api/instance"

export interface ChatRequest {
  message: string
}

export const sendMessage = async (chatRoomId: number, chat: ChatRequest) => {
  try {
    const res = await api().post(`/chat-room/${chatRoomId}/send`, chat)
    console.log("메시지 전송 성공: ", res.status)
  } catch (error: any) {
    console.error("메시지 전송 실패: ", error)
    // console.log("서버 응답:", error.response?.data)
  }
}
