import { useEffect, useState } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ChatMessages from "./components"

const messages = [
  {
    id: 1,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "안녕\n",
    isTyping: false,
    time: "5:35 PM",
  },
  {
    id: 2,
    sender: "self",
    profileImage: "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
    text: "그.. 혹시 발 사이즈를 좀 알 수 있을까?",
    isTyping: false,
    time: "5:36 PM",
  },
  {
    id: 3,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "그런 게 궁금하다니! 나는 222야\n",
    isTyping: false,
    time: "5:36 PM",
  },
  {
    id: 4,
    sender: "self",
    profileImage: "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
    text: "그렇구나 지금 뭐해?",
    isTyping: false,
    time: "5:37 PM",
  },
  {
    id: 5,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "나는 저녁을 차리고 있어\n",
    isTyping: false,
    time: "5:37 PM",
  },
  {
    id: 6,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "오늘 저녁으론 치즈고기파이를 만들 예정이야!\n 맛있겠지?",
    isTyping: false,
    time: "5:37 PM",
  },
  {
    id: 7,
    sender: "self",
    profileImage: "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
    text: "헐 레시피가 궁금해",
    isTyping: false,
    time: "5:38 PM",
  },
  {
    id: 8,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "",
    isTyping: true,
    time: "Typing",
  },
]

const ChatPage = () => {
  /*
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages")
        const data = await response.json()
        setMessages(data) // 상태 업데이트
      } catch (error) {
        console.error("Failed to fetch messages:", error)
      }
    }

    fetchMessages()
  }, [])
  */

  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {/* 임시로 사이드바 위치 지정 - 후에 컴포넌트로 수정! */}
      <div className="h-full w-[255px] bg-gray-200"></div>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex flex-1 flex-col">
        <ScrollArea className="flex-1 overflow-y-auto px-4">
          {/* 오른쪽 상단 프로필 이미지 위치 - 후에 컴포넌트로 수정! */}
          <div className="flex justify-end pt-4 pr-4">
            <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-gray-200">
              <img
                src="https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08"
                alt="User Avatar"
              />
            </div>
          </div>

          {/* 채팅창 헤더 - 캐릭터 소개 */}
          <div className="flex justify-center pt-12 pb-6">
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
                style={{
                  boxShadow: "none",
                }}
                className="font-body-body-m h-[51px] w-full rounded-[71px] border border-[#BABABA] bg-[#F7F7F7] px-4 py-2 text-[14px] leading-[20px] text-black"
                placeholder="Type a message..."
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-[5px] right-[5px] flex h-[41px] w-[62px] items-center justify-center rounded-full border-[1px] border-[#BABABA] bg-white"
              >
                <img src="/icons/Polygon13.svg" alt="Call" className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChatPage
