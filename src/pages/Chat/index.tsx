import call from 'icon/Subtract.svg';
import send from 'icon/Polygon13.svg';

const ChatPage = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="flex h-full">
        {/* 임시로 사이드바 위치 지정 - 후에 컴포넌트로 수정! */}
        <div className="w-[255px] h-full bg-gray-100"></div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative bg-white">
            <div 
              className="absolute w-[130px] h-[130px] rounded-full bg-gray-100"
              style={{
                left: '50%',
                top: '15%',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
            <div 
              className="absolute text-center text-2xl"
              style={{
                left: '50%',
                top: 'calc(15% + 70px)',
                transform: 'translateX(-50%)'
              }}
            >
              신데렐라
            </div>
            <div 
              className="absolute text-center text-lg"
              style={{
                left: '50%',
                top: 'calc(15% + 100px)',
                transform: 'translateX(-50%)',
                maxWidth: '300px'
              }}
            >
              저는 12시가 되면 돌아가야만 해요
            </div>
          </div>

          {/* 바텀바 */}
          <div className="h-[110px] flex items-center">
            <div className="flex items-center gap-3 w-full max-w-[762px] mx-auto">

              <div className="w-[45px] h-[45px] rounded-full bg-[#FFFFFF] flex items-center justify-center border-[#BABABA] border-[1px]">
                <img src={call} alt="Call" className="w-6 h-6" />
              </div>

              <div className="relative flex-1 border-[#BABABA] border-[1px] rounded-[71px]">
                <input
                  type="text"
                  className="w-full h-[51px] px-4 py-2 bg-[#F7F7F7] rounded-[71px] text-black font-body text-[14px] leading-[20px]"
                  placeholder="Type a message..."
                />

                <div className="absolute right-[5px] top-[5px] w-[62px] h-[41px] rounded-full bg-[#FFFFFF] flex items-center justify-center border-[#BABABA] border-[1px]">
                  <img src={send} alt="Send" className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오른쪽 상단 프로필 이미지 위치 - 후에 컴포넌트로 수정! */}
      <div className="absolute top-4 right-4">
        <div className="w-[36px] h-[36px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden"></div>
      </div>
    </div>
  );
};

export default ChatPage;
