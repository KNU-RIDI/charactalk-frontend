import { useState, useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessages from "./components/Bubble"
import { sendMessage } from "@/api/Chat/usePostMessage"
import { useChatStream } from "@/api/Chat/useChatStream"
import { getChatRoomDetail } from "@/api/ChatRoom/useGetChatRoomDetail"
import { Message, ChatRoomDetail } from "@/types/index"
import Live2DView from "../Live2D"
import Profile from "@/components/Profile"
import Sidebar from "@/components/Sidebar/sidebar"

const ChatPage = () => {
  const { id } = useParams()
  const chatRoomId = Number(id)

  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isCalling, setIsCalling] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [chatRoomDetail, setChatRoomDetail] = useState<ChatRoomDetail | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useChatStream(chatRoomId, (incomingMessage) => {
    setIsReplying(true)
    setMessages((prev) => [...prev, incomingMessage])

    setTimeout(() => {
      setIsReplying(false)
    }, 500)
  })

  useEffect(() => {
    if (!chatRoomId) return

    getChatRoomDetail(chatRoomId)
      .then((data) => {
        setChatRoomDetail(data)
      })
      .catch((err) => {
        console.error("채팅방 상세 정보 조회 실패:", err)
      })
  }, [chatRoomId])

  const handleSend = async () => {
    if (!input.trim() || isReplying) return

    try {
      await sendMessage(chatRoomId, { message: input })

      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          sender: "self",
          message: input,
          profileImage:
            "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
          text: input,
          timestamp: new Date().toISOString(),
          isTyping: false,
        },
      ])

      setInput("")
    } catch (error) {
      console.error("메시지 전송 실패", error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isReplying) {
      e.preventDefault()
      handleSend()
    }
  }

  const startCall = () => {
    setIsCalling(true)
  }

  const endCall = () => {
    setIsCalling(false)
  }

  const formatTime = (timestamp: string) => {
    let date = new Date(timestamp)

    if (timestamp.includes("T") && !timestamp.endsWith("Z")) {
      date = new Date(timestamp + "Z")
    } else {
      date = new Date(timestamp)
    }

    const hour = date.getHours()
    const minute = date.getMinutes().toString().padStart(2, "0")
    const ampm = hour >= 12 ? "PM" : "AM"
    return `${hour}:${minute}${ampm}`
  }

  return isCalling ? (
    <Live2DView onEndCall={endCall} />
  ) : (
    <div className="relative flex h-screen overflow-hidden bg-white">
      <Sidebar />
      {/* 메인 컨텐츠 영역 */}
      <main className="flex flex-1 flex-col">
        <ScrollArea className="flex-1 overflow-y-auto px-4">
          {/* 오른쪽 상단 프로필 컴포넌트 */}
          <div className="top-20 right-10 z-10 flex justify-end pt-4 pr-2">
            <Profile />
          </div>
          {/* 채팅창 헤더 */}
          <div className="flex justify-center pt-6 pb-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-[130px] w-[130px]">
                <AvatarImage
                  src={chatRoomDetail?.characterImageUrl ?? ""}
                  alt={chatRoomDetail?.characterName ?? "캐릭터"}
                />
              </Avatar>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.96px]">
                {chatRoomDetail?.characterName ?? "캐릭터 이름"}
              </h2>
              <p className="mt-1 text-[15px] tracking-[-0.60px]">
                {chatRoomDetail?.characterDescription ?? "캐릭터 소개가 없습니다."}
              </p>
            </div>
          </div>

          {/* Chat Messages */}
          <ChatMessages messages={messages} formatTime={formatTime} />
          <div ref={bottomRef} />
        </ScrollArea>

        {/* 바텀바 */}
        <div className="flex h-[110px] items-center">
          <div className="mx-auto flex w-full max-w-[762px] items-center gap-3">
            {/* 통화 시작 버튼 */}
            <Button
              variant="outline"
              size="icon"
              onClick={startCall}
              className="flex h-[45px] w-[45px] items-center justify-center rounded-full border border-[var(--gray4)] bg-white"
            >
              <img src="/icons/Subtract.svg" alt="Call" className="h-8 w-8" />
            </Button>

            {/* 입력 부분 */}
            <div className="relative flex-1">
              <Input
                type="text"
                value={input}
                disabled={isReplying}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                style={{ boxShadow: "none" }}
                className="font-body-body-m h-[51px] w-full rounded-[71px] border border-[var(--gray4)] bg-[var(--gray3)] px-4 py-2 text-[14px] leading-[20px] text-black"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={handleSend}
                disabled={isReplying}
                className="absolute top-[5px] right-[5px] flex h-[41px] w-[62px] items-center justify-center rounded-full border-[1px] border-[var(--gray4)] bg-white"
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
