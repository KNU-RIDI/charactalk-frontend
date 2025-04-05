import { apiWithToken } from "@/api/instance"

export interface ChatRequest {
  chatRoomId: number
  senderId: number
  charId: string
  message: string
  timestamp: string
}

export const sendMessage = async (chat: ChatRequest) => {
  try {
    const res = await apiWithToken().post("/chat/send", chat)
    console.log("메시지 전송 성공: ", res.status)
  } catch (error: any) {
    console.error("메시지 전송 실패: ", error)
    // console.log("서버 응답:", error.response?.data)
  }
}
