import { LAppDelegate } from "@/live2d/lappdelegate"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"

function Live2DView({ onEndCall }: { onEndCall: () => void }) {
  const canvasId = "live2d-canvas"
  
  useEffect(() => {
    if (LAppDelegate.getInstance().initialize(canvasId)) {
      console.log("Live2DView initialized.")
      LAppDelegate.getInstance().run()
    }

    return () => {
      console.log("Live2DView released.")
      LAppDelegate.releaseInstance()
    }
  }, [])

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-white">
      <section
        className="relative -mt-15 flex w-full max-w-[657px] flex-col items-center justify-center px-4 pt-8"
        style={{
          height: "657px",
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(30,158,255,0.25) 0%, rgba(30,158,255,0) 100%)",
        }}
      >
        <canvas
          id={canvasId}
          className="absolute top-1/2 left-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 object-contain"
        />

        <div className="text-black-500 absolute bottom-12 text-xl font-semibold tracking-[-0.96px]">
          신데렐라
        </div>
        <div className="absolute bottom-5 text-[15px] font-normal tracking-[-0.60px] text-gray-600">
          저는 12시가 되면 돌아가야만 해요
        </div>
      </section>

      <footer className="z-10 mt-10 flex items-center gap-12">
        {/* 녹음 버튼 */}
        <div className="flex flex-col items-center">
          <Button
            id="recordBtn"
            variant="default"
            className="flex h-[63px] w-[63px] items-center justify-center rounded-full border border-gray-400 bg-[var(--blue)] transition hover:bg-[var(--blue)] active:brightness-90"
            aria-label="녹음"
          >
            <img src="/icons/mic.svg" alt="mic" className="h-8 w-8" />
          </Button>
          <span className="mt-2 text-sm tracking-[-0.96px] text-black">녹음하기</span>
        </div>
        {/* 통화 종료 버튼 */}
        <div className="flex flex-col items-center">
          <Button
            id="endCallBtn"
            variant="outline"
            onClick={onEndCall}
            className="flex h-[63px] w-[63px] items-center justify-center rounded-full border-[var(--gray4)]"
            aria-label="통화 종료"
          >
            <img src="/icons/close.svg" alt="x" className="h-8 w-8" />
          </Button>
          <span className="mt-2 text-sm tracking-[-0.96px] text-black">나가기</span>
        </div>
      </footer>
    </main>
  )
}

export default Live2DView
