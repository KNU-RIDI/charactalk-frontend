import { useEffect, useCallback } from "react"
import { Message } from "@/types"

type OnMessageCallback = (message: Message) => void

export const useChatStream = (onMessage: OnMessageCallback) => {
  // 콜백을 useCallback으로 고정해서 useEffect 의존성 문제 방지
  const handleMessage = useCallback(onMessage, [])

  useEffect(() => {
    const eventSource = new EventSource(`${import.meta.env.VITE_API_URL}/chat/stream?memberId=5`, {
      withCredentials: true,
    } as any)

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        const newMessage: Message = {
          id: data.id ?? 0,
          sender: data.sender ?? "신데렐라",
          profileImage:
            "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
          text: data.token ?? data.message ?? "",
          timestamp: data.timestamp ?? new Date().toISOString(),
          isTyping: !data.isFinal,
        }

        console.log("📩 받은 메시지:", newMessage)
        handleMessage(newMessage)
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
  }, [handleMessage])
}
