import { useEffect, useCallback } from "react"
import { Message } from "@/types"

type OnMessageCallback = (message: Message) => void

export const useChatStream = (chatRoomId: number, onMessage: OnMessageCallback) => {
  const handleMessage = useCallback(onMessage, [])

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/chat-room/${chatRoomId}/stream`,
      { withCredentials: true } as any,
    )

    let messageBuffer = ""

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.token) {
          messageBuffer += data.token
        }

        if (data.isFinal) {
          let cleanText = messageBuffer.trim()
          cleanText = cleanText.replace(/^[^:\n]{1,20}:\s*/, "")

          if (!cleanText) {
            messageBuffer = ""
            return
          }

          const finalMessage: Message = {
            id: data.id ?? Math.random(),
            sender: data.name,
            profileImage:
              "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
            text: cleanText,
            timestamp: data.timestamp ?? new Date().toISOString(),
            isTyping: false,
          }

          handleMessage(finalMessage)
          messageBuffer = ""
        }
      } catch (error) {
        console.error("메시지 파싱 오류:", error)
      }
    }

    eventSource.onerror = (error) => {
      console.error("❌ SSE 오류 발생:", error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [chatRoomId, handleMessage])
}
