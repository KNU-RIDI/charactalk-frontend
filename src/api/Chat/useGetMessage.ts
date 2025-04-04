import { useEffect } from "react"
import { Message } from "@/types"

type OnMessageCallback = (message: Message) => void

export const chatStream = (chatRoomId: number, onMessage: OnMessageCallback) => {
  useEffect(() => {
    const eventSource = new EventSource(`/chat/stream?chatRoomId=${chatRoomId}`)

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)

      const newMessage: Message = {
        id: data.id,
        sender: data.sender,
        profileImage: data.profileImage,
        text: data.message,
        timestamp: data.timestamp,
        isTyping: false,
      }

      onMessage(newMessage)
    }

    eventSource.onerror = (error) => {
      console.error("SSE 오류 발생 ?", error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [chatRoomId, onMessage])
}
