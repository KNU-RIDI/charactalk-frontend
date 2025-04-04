import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessages from "./components/Bubble"
import Profile from "@/components/Profile"
import Layout from "@/components/Sidebar/layout"
import { sendMessage } from "@/api/Chat/usePostMessage"
import { Message } from "@/types/index"
import { chatStream } from "@/api/Chat/useGetMessage"

const ChatPage = () => {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const chatRoomId = 1

  chatStream(chatRoomId, (incomingMessage) => {
    setMessages((prev) => [...prev, incomingMessage])
  })

  const handleSend = async () => {
    if (!input.trim()) return

    const chatRequest = {
      chatRoomId: 1,
      senderId: 123,
      charId: "cinderella",
      message: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    try {
      await sendMessage(chatRequest)

      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          sender: "self",
          message: input,
          profileImage:
            "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
          text: input,
          timestamp: chatRequest.timestamp,
          isTyping: false,
        },
      ])

      setInput("")
    } catch (error) {
      console.error("메시지 전송 실패", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {/* 사이드바 컴포넌트 오류로 잠시 사용 중지 */}
      <div className="h-full w-[255px] bg-gray-200"></div>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex flex-1 flex-col">
        <ScrollArea className="flex-1 overflow-y-auto px-4">
          {/* 오른쪽 상단 프로필 컴포넌트 */}
          <div className="absolute top-4 right-4 z-50">
            <Profile />
          </div>

          {/* 채팅창 헤더 - 캐릭터 소개 */}
          <div className="flex justify-center pb-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-[130px] w-[130px]">
                <AvatarImage
                  src="https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000"
                  alt="Cinderella"
                />
              </Avatar>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.96px]">신데렐라</h2>
              <p className="mt-1 text-[15px] tracking-[-0.60px]">
                저는 12시가 되면 돌아가야만 해요
              </p>
            </div>
          </div>
          {/* Chat Messages */}
          <ChatMessages messages={messages} />
        </ScrollArea>

        {/* 바텀바 */}
        <div className="flex h-[110px] items-center">
          <div className="mx-auto flex w-full max-w-[762px] items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[#BABABA] bg-white"
            >
              <img src="/icons/Subtract.svg" alt="Call" className="h-8 w-8" />
            </Button>

            {/* 입력 부분 */}
            <div className="relative flex-1">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                style={{ boxShadow: "none" }}
                className="font-body-body-m h-[51px] w-full rounded-[71px] border border-[#BABABA] bg-[#F7F7F7] px-4 py-2 text-[14px] leading-[20px] text-black"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={handleSend}
                className="absolute top-[5px] right-[5px] flex h-[41px] w-[62px] items-center justify-center rounded-full border-[1px] border-[#BABABA] bg-white"
              >
                <img src="/icons/Polygon13.svg" alt="Send" className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChatPage
