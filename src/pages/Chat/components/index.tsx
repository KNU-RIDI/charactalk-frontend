import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const messages = [
  {
    id: 1,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
    text: "테스트용 텍스트입니다.\n",
    isTyping: false,
    time: "5:35 PM",
  },
  {
    id: 2,
    sender: "other",
    profileImage: "https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08",
    text: "그.. 혹시 발 사이즈를 좀 알 수 있을까?",
    isTyping: true,
    time: "Typing",
  },
  {
    id: 3,
    sender: "self",
    profileImage: "https://github.com/user-attachments/assets/b3b0b3b8-5d40-439f-b523-03cd7cc6c000",
    text: "",
    isTyping: false,
    time: "5:35 PM",
  },
]

const ChatMessages = () => {
  return (
    <div className="relative h-[496px] w-[369px]">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[5px] border border-dashed border-[#9747ff] p-2">
        {messages.map((message) => {
          const isSelf = message.sender === "self"

          return (
            <div
              key={message.id}
              className={`flex ${isSelf ? "justify-end" : "justify-start"} mb-8`}
            >
              {/* 캐릭터 프사 */}
              {!isSelf && (
                <Avatar className="mr-2 h-[54px] w-[54px] flex-shrink-0">
                  <AvatarImage src={message.profileImage} alt="Profile" />
                </Avatar>
              )}

              {/* 사용자 프사 */}
              {isSelf && (
                <Avatar className="ml-2 h-[54px] w-[54px] flex-shrink-0">
                  <AvatarImage src={message.profileImage} alt="Profile" />
                </Avatar>
              )}

              <div className="flex flex-col">
                <Card
                  className={`border-gray-4 border border-solid ${
                    isSelf
                      ? "rounded-[40px_0px_40px_40px] bg-white"
                      : "bg-gray-3 rounded-[0px_40px_40px_40px]"
                  }`}
                >
                  {/* 타이핑 중일 때! */}
                  <CardContent className="px-[22px] py-5">
                    {message.isTyping ? (
                      <div className="flex items-center gap-[17px]">
                        {["white", "#e6e6e6", "#b5b5b5"].map((color, index) => (
                          <div
                            key={index}
                            className="h-[17px] w-[16.52px] rounded-[8.26px/8.5px]"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="[font-family:'Inter-Regular',Helvetica] text-[15px] font-normal whitespace-pre-line text-black">
                        {message.text}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <span
                  className={`text-gray-1 mt-1 [font-family:'Inter-ExtraLight',Helvetica] text-[11px] font-extralight ${
                    isSelf ? "text-right" : ""
                  }`}
                >
                  {message.time}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChatMessages
