import { LAppDelegate } from '@/live2d/lappdelegate';
import { useEffect } from 'react';

function Live2DView() {

  useEffect(() => {
    if (LAppDelegate.getInstance().initialize()) {
      LAppDelegate.getInstance().run();
    }
    return () => {
      LAppDelegate.releaseInstance();
    }
  }, []);

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <button id="startCallBtn">📞 통화 시작</button>
      <button id="recordBtn" disabled>🎙️ 녹음</button>
      <button id="endCallBtn" disabled>📴 통화 종료</button>
      <canvas
        id="live2d-canvas"
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
}

export default Live2DView;