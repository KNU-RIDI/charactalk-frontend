import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface Message {
  id: number
  sender: string
  profileImage: string
  text: string
  isTyping: boolean
  time: string
}

interface ChatMessagesProps {
  messages: Message[]
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message: Message) => {
        const isSelf = message.sender === "self"

        return (
          <div key={message.id} className={`flex ${isSelf ? "justify-end" : "justify-start"} mb-3`}>
            {/* 캐릭터 프사 */}
            {!isSelf && (
              <Avatar className="mr-2 h-[50px] w-[50px] flex-shrink-0">
                <AvatarImage src={message.profileImage} alt="Profile" />
              </Avatar>
            )}

            <div className="flex flex-col items-start gap-[1px] py-[40px]">
              <Card
                className={`border border-solid border-[#BABABA] shadow-none ${
                  isSelf
                    ? "rounded-[50px_0px_50px_50px] bg-white"
                    : "rounded-[0px_50px_50px_50px] bg-[#F7F7F7]"
                }`}
              >
                <CardContent className="px-[22px] py-2">
                  {/* 타이핑 중일 때! */}
                  {message.isTyping ? (
                    <div className="flex items-center gap-[17px]">
                      {["white", "#e6e6e6", "#b5b5b5"].map((color, index) => (
                        <div
                          key={index}
                          className="h-[17px] w-[16.52px] animate-bounce rounded-full"
                          style={{ backgroundColor: color, animationDelay: `${index * 0.3}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[15px] font-normal whitespace-pre-line text-black">
                      {message.text}
                    </p>
                  )}
                </CardContent>
              </Card>

              <span
                className={`text-[11px] font-extralight text-[#616161] ${
                  isSelf ? "text-right" : ""
                }`}
              >
                {message.time}
              </span>
            </div>

            {/* 사용자 프사 */}
            {isSelf && (
              <Avatar className="ml-2 h-[50px] w-[50px] flex-shrink-0">
                <AvatarImage src={message.profileImage} alt="Profile" />
              </Avatar>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ChatMessages
