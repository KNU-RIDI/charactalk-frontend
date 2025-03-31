const ChatPage = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="flex h-full">
        {/* 임시로 사이드바 위치 지정 - 후에 컴포넌트로 수정! */}
        <div className="h-full w-[255px] bg-gray-100"></div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex flex-1 flex-col">
          <div className="relative flex-1 bg-white">
            <div
              className="absolute h-[130px] w-[130px] rounded-full bg-gray-100"
              style={{
                left: "50%",
                top: "15%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
            <div
              className="absolute text-center text-2xl"
              style={{
                left: "50%",
                top: "calc(15% + 70px)",
                transform: "translateX(-50%)",
              }}
            >
              신데렐라
            </div>
            <div
              className="absolute text-center text-lg"
              style={{
                left: "50%",
                top: "calc(15% + 100px)",
                transform: "translateX(-50%)",
                maxWidth: "300px",
              }}
            >
              저는 12시가 되면 돌아가야만 해요
            </div>
          </div>

          {/* 바텀바 */}
          <div className="flex h-[110px] items-center">
            <div className="mx-auto flex w-full max-w-[762px] items-center gap-3">
              <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full border-[1px] border-[#BABABA] bg-[#FFFFFF]">
                <img src="/icons/Subtract.svg" alt="Call" className="h-6 w-6" />
              </div>

              <div className="relative flex-1 rounded-[71px] border-[1px] border-[#BABABA]">
                <input
                  type="text"
                  className="font-body h-[51px] w-full rounded-[71px] bg-[#F7F7F7] px-4 py-2 text-[14px] leading-[20px] text-black"
                  placeholder="Type a message..."
                />

                <div className="absolute top-[5px] right-[5px] flex h-[41px] w-[62px] items-center justify-center rounded-full border-[1px] border-[#BABABA] bg-[#FFFFFF]">
                  <img src="/icons/Polygon13.svg" alt="Send" className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상단 프로필 이미지 위치 - 후에 컴포넌트로 수정! */}
      <div className="absolute top-4 right-4">
        <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-gray-100"></div>
      </div>
    </div>
  )
}

export default ChatPage
