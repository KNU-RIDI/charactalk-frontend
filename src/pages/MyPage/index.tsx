import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Profile from "@/components/Profile"

const MyPage = () => {
  const [name, setName] = useState("가넷")
  const profileData = {
    gender: "여성",
    birthdate: "2000-11-25",
  }

  const dateInputRef = useRef<HTMLInputElement>(null)
  const genderSelectRef = useRef<HTMLSelectElement>(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    navigate("/")
  }

  return (
    <div className="relative h-screen w-screen bg-[var(--gray3)]">
      {/* 뒤로가기 버튼 */}
      <div className="absolute top-4 left-4 flex h-[36px] w-[36px] items-center justify-center">
        <img src="/icons/back.svg" alt="Back" className="h-6 w-6" />
      </div>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex h-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-[934px] rounded-[20px] bg-white shadow-[0px_3px_3px_#00000040]">
          <div className="flex flex-col items-center pt-14 pb-16">
            <h2 className="mb-8 text-2xl font-semibold text-gray-700">프로필 설정</h2>
            <div className="relative mb-8">
              <div className="relative flex h-[110px] w-[110px] items-center justify-center rounded-full bg-gray-200">
                <img src="/icons/camera.svg" alt="Camera" className="h-[50px] w-[50px]" />
              </div>
              <p className="mt-2 text-center text-xs font-extralight text-[#929292]">사진 삭제</p>
            </div>

            <div className="flex w-full max-w-[270px] flex-col gap-6">
              {/* 이름 입력 */}
              <div className="space-y-2">
                <label className="ml-1.5 text-base font-extralight text-black">이름</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-10 w-full rounded-[10px] border border-gray-300 pr-10 pl-4 font-extralight"
                  />
                  {name && (
                    <button
                      type="button"
                      className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 transform p-0"
                      onClick={() => setName("")}
                    >
                      <img src="/icons/close.svg" alt="Close" className="h-full w-full" />
                    </button>
                  )}
                </div>
              </div>

              {/* 성별 선택 */}
              <div className="space-y-2">
                <label className="ml-1.5 text-base font-extralight text-black">성별</label>
                <div className="relative">
                  <select
                    defaultValue={profileData.gender}
                    ref={genderSelectRef}
                    className="h-10 w-full appearance-none rounded-[10px] border border-gray-300 pr-10 pl-4 font-extralight"
                    style={{ position: "relative", zIndex: 10 }}
                  >
                    <option value="">성별 선택</option>
                    <option value="여성">여성</option>
                    <option value="남성">남성</option>
                  </select>
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 transform p-0"
                    onClick={() => genderSelectRef.current?.focus()}
                  >
                    <img src="/icons/down.svg" alt="Dropdown Icon" className="h-full w-full" />
                  </button>
                </div>
              </div>

              {/* 생년월일 입력 */}
              <div className="space-y-2">
                <label className="ml-1.5 text-base font-extralight text-black">생년월일</label>
                <div className="relative">
                  <input
                    type="date"
                    defaultValue={profileData.birthdate}
                    ref={dateInputRef}
                    className="h-[45px] w-full appearance-none rounded-[10px] border border-gray-300 pr-10 pl-4 font-extralight"
                    style={{ position: "relative", zIndex: 10 }}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 transform p-0"
                    onClick={() => dateInputRef.current?.showPicker()}
                  >
                    <img src="/icons/calender.svg" alt="Calendar" className="h-full w-full" />
                  </button>
                  <style>
                    {`
                      input[type="date"]::-webkit-calendar-picker-indicator {
                        opacity: 0;
                        position: absolute;
                        width: 100%;
                        height: 100%;
                      }
                    `}
                  </style>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-10 h-[36px] w-[132px] rounded-[10px] bg-[var(--blue)] font-bold text-white"
            >
              저장
            </button>

            {/* 로그아웃 */}
            <p
              className="mt-3 cursor-pointer text-[12px] text-[var(--gray1)] underline"
              onClick={handleLogout}
            >
              로그아웃
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽 상단 프로필*/}
      <div className="flex justify-end pt-4 pr-4">
        <Profile></Profile>
      </div>
    </div>
  )
}

export default MyPage
