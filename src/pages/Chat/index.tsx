import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ChatPage = () => {
  return (
    <div className="relative flex h-screen overflow-hidden bg-white">
      {/* 임시로 사이드바 위치 지정 - 후에 컴포넌트로 수정! */}
      <div className="h-full w-[255px] bg-gray-200"></div>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex h-screen flex-1 flex-col">
        <ScrollArea className="flex-1 px-4">
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

      {/* 오른쪽 상단 프로필 이미지 위치 - 후에 컴포넌트로 수정! */}
      <div className="absolute top-4 right-4">
        <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-gray-200">
          <img
            src="https://github.com/user-attachments/assets/1f81de33-1b45-45b4-8474-ad33dc558e08"
            alt="User Avatar"
          />
        </div>
      </div>
    </div>
  )
}

export default ChatPage
