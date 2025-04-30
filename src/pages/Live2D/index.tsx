import { LAppDelegate } from '@/live2d/lappdelegate';
import { useEffect } from 'react';

function Live2DView() {
  const canvasId = 'live2d-canvas';

  useEffect(() => {
    if (LAppDelegate.getInstance().initialize(canvasId)) {
      console.log('Live2DView initialized.');
      LAppDelegate.getInstance().run();
    }
    
    return () => {
      console.log('Live2DView released.');
      LAppDelegate.releaseInstance();
    };
  }, []);

  return (
    <div style={{ width: '700px', height: '700px' }}>
      <button id="startCallBtn">📞 통화 시작</button>
      <button id="recordBtn">🎙️ 녹음</button>
      <button id="endCallBtn">📴 통화 종료</button>
      <canvas
        id={canvasId}
        style={{ width: '100%', height: '100%' }}
      ></canvas>
    </div>
  );
}

export default Live2DView;