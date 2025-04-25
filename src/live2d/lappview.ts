/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismMatrix44 } from '@framework/math/cubismmatrix44';
import { CubismViewMatrix } from '@framework/math/cubismviewmatrix';

import * as LAppDefine from './lappdefine';
import { LAppPal } from './lapppal';
import { TouchManager } from './touchmanager';
import { LAppSubdelegate } from './lappsubdelegate';

/**
 * 렌더링 클래스.
 */
export class LAppView {
  /**
   * 생성자
   */
  public constructor() {
    this._programId = null;

    // 터치 관련 이벤트 관리
    this._touchManager = new TouchManager();

    // 디바이스 좌표에서 화면 좌표로 변환하기 위한
    this._deviceToScreen = new CubismMatrix44();

    // 화면 표시의 확대/축소 및 이동 변환을 수행하는 행렬
    this._viewMatrix = new CubismViewMatrix();
  }

  /**
   * 초기화한다.
   */
  public initialize(subdelegate: LAppSubdelegate): void {
    this._subdelegate = subdelegate;
    const { width, height } = subdelegate.getCanvas();

    const ratio: number = width / height;
    const left: number = -ratio;
    const right: number = ratio;
    const bottom: number = LAppDefine.ViewLogicalLeft;
    const top: number = LAppDefine.ViewLogicalRight;

    this._viewMatrix.setScreenRect(left, right, bottom, top); // 디바이스에 대응하는 화면의 범위. X의 왼쪽 끝, X의 오른쪽 끝, Y의 아래쪽 끝, Y의 위쪽 끝
    this._viewMatrix.scale(LAppDefine.ViewScale, LAppDefine.ViewScale);

    this._deviceToScreen.loadIdentity();
    if (width > height) {
      const screenW: number = Math.abs(right - left);
      this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
    } else {
      const screenH: number = Math.abs(top - bottom);
      this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
    }
    this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);

    // 표시 범위 설정
    this._viewMatrix.setMaxScale(LAppDefine.ViewMaxScale); // 최대 확대 비율
    this._viewMatrix.setMinScale(LAppDefine.ViewMinScale); // 최소 축소 비율

    // 표시 가능한 최대 범위
    this._viewMatrix.setMaxScreenRect(
      LAppDefine.ViewLogicalMaxLeft,
      LAppDefine.ViewLogicalMaxRight,
      LAppDefine.ViewLogicalMaxBottom,
      LAppDefine.ViewLogicalMaxTop
    );
  }

  /**
   * 해제한다.
   */
  public release(): void {
    this._viewMatrix = null;
    this._touchManager = null;
    this._deviceToScreen = null;

    this._subdelegate.getGlManager().getGl().deleteProgram(this._programId);
    this._programId = null;
  }

  /**
   * 렌더링한다.
   */
  public render(): void {
    this._subdelegate.getGlManager().getGl().useProgram(this._programId);
    this._subdelegate.getGlManager().getGl().flush();

    const lapplive2dmanager = this._subdelegate.getLive2DManager();
    if (lapplive2dmanager != null) {
      lapplive2dmanager.setViewMatrix(this._viewMatrix);

      lapplive2dmanager.onUpdate();
    }
  }

  /**
   * 터치되었을 때 호출된다.
   *
   * @param pointX 화면 X좌표
   * @param pointY 화면 Y좌표
   */
  public onTouchesBegan(pointX: number, pointY: number): void {
    this._touchManager.touchesBegan(
      pointX * window.devicePixelRatio,
      pointY * window.devicePixelRatio
    );
  }

  /**
   * 터치 중 포인터가 움직이면 호출된다.
   *
   * @param pointX 화면 X좌표
   * @param pointY 화면 Y좌표
   */
  public onTouchesMoved(pointX: number, pointY: number): void {
    const posX = pointX * window.devicePixelRatio;
    const posY = pointY * window.devicePixelRatio;

    const lapplive2dmanager = this._subdelegate.getLive2DManager();

    const viewX: number = this.transformViewX(this._touchManager.getX());
    const viewY: number = this.transformViewY(this._touchManager.getY());

    this._touchManager.touchesMoved(posX, posY);

    lapplive2dmanager.onDrag(viewX, viewY);
  }

  /**
   * 터치가 종료되면 호출된다.
   *
   * @param pointX 화면 X좌표
   * @param pointY 화면 Y좌표
   */
  public onTouchesEnded(pointX: number, pointY: number): void {
    const posX = pointX * window.devicePixelRatio;
    const posY = pointY * window.devicePixelRatio;

    const lapplive2dmanager = this._subdelegate.getLive2DManager();

    // 터치 종료
    lapplive2dmanager.onDrag(0.0, 0.0);

    // 싱글 탭
    const x: number = this.transformViewX(posX);
    const y: number = this.transformViewY(posY);

    if (LAppDefine.DebugTouchLogEnable) {
      LAppPal.printMessage(`[APP]touchesEnded x: ${x} y: ${y}`);
    }
    lapplive2dmanager.onTap(x, y);
  }

  /**
   * X좌표를 View 좌표로 변환한다.
   *
   * @param deviceX 디바이스 X좌표
   */
  public transformViewX(deviceX: number): number {
    const screenX: number = this._deviceToScreen.transformX(deviceX); // 논리 좌표로 변환된 좌표를 가져온다.
    return this._viewMatrix.invertTransformX(screenX); // 확대, 축소, 이동 후의 값.
  }

  /**
   * Y좌표를 View 좌표로 변환한다.
   *
   * @param deviceY 디바이스 Y좌표
   */
  public transformViewY(deviceY: number): number {
    const screenY: number = this._deviceToScreen.transformY(deviceY); // 논리 좌표로 변환된 좌표를 가져온다.
    return this._viewMatrix.invertTransformY(screenY);
  }

  /**
   * X좌표를 Screen 좌표로 변환한다.
   * @param deviceX 디바이스 X좌표
   */
  public transformScreenX(deviceX: number): number {
    return this._deviceToScreen.transformX(deviceX);
  }

  /**
   * Y좌표를 Screen 좌표로 변환한다.
   *
   * @param deviceY 디바이스 Y좌표
   */
  public transformScreenY(deviceY: number): number {
    return this._deviceToScreen.transformY(deviceY);
  }

  _touchManager: TouchManager; // 터치 매니저
  _deviceToScreen: CubismMatrix44; // 디바이스에서 화면으로의 행렬
  _viewMatrix: CubismViewMatrix; // viewMatrix
  _programId: WebGLProgram; // 셰이더 ID
  _changeModel: boolean; // 모델 전환 플래그
  _isClick: boolean; // 클릭 중
  private _subdelegate: LAppSubdelegate;
}
