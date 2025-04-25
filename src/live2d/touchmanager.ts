/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

export class TouchManager {
  /**
   * 생성자
   */
  constructor() {
    this._startX = 0.0;
    this._startY = 0.0;
    this._lastX = 0.0;
    this._lastY = 0.0;
    this._lastX1 = 0.0;
    this._lastY1 = 0.0;
    this._lastX2 = 0.0;
    this._lastY2 = 0.0;
    this._lastTouchDistance = 0.0;
    this._deltaX = 0.0;
    this._deltaY = 0.0;
    this._scale = 1.0;
    this._touchSingle = false;
    this._flipAvailable = false;
  }

  public getCenterX(): number {
    return this._lastX;
  }

  public getCenterY(): number {
    return this._lastY;
  }

  public getDeltaX(): number {
    return this._deltaX;
  }

  public getDeltaY(): number {
    return this._deltaY;
  }

  public getStartX(): number {
    return this._startX;
  }

  public getStartY(): number {
    return this._startY;
  }

  public getScale(): number {
    return this._scale;
  }

  public getX(): number {
    return this._lastX;
  }

  public getY(): number {
    return this._lastY;
  }

  public getX1(): number {
    return this._lastX1;
  }

  public getY1(): number {
    return this._lastY1;
  }

  public getX2(): number {
    return this._lastX2;
  }

  public getY2(): number {
    return this._lastY2;
  }

  public isSingleTouch(): boolean {
    return this._touchSingle;
  }

  public isFlickAvailable(): boolean {
    return this._flipAvailable;
  }

  public disableFlick(): void {
    this._flipAvailable = false;
  }

  /**
   * 터치 시작 시 이벤트
   * @param deviceX 터치한 화면의 x 값
   * @param deviceY 터치한 화면의 y 값
   */
  public touchesBegan(deviceX: number, deviceY: number): void {
    this._lastX = deviceX;
    this._lastY = deviceY;
    this._startX = deviceX;
    this._startY = deviceY;
    this._lastTouchDistance = -1.0;
    this._flipAvailable = true;
    this._touchSingle = true;
  }

  /**
   * 드래그 시 이벤트
   * @param deviceX 터치한 화면의 x 값
   * @param deviceY 터치한 화면의 y 값
   */
  public touchesMoved(deviceX: number, deviceY: number): void {
    this._lastX = deviceX;
    this._lastY = deviceY;
    this._lastTouchDistance = -1.0;
    this._touchSingle = true;
  }

  /**
   * 플릭 거리 측정
   * @return 플릭 거리
   */
  public getFlickDistance(): number {
    return this.calculateDistance(
      this._startX,
      this._startY,
      this._lastX,
      this._lastY
    );
  }

  /**
   * 점 1에서 점 2까지의 거리를 구함
   *
   * @param x1 첫 번째 터치한 화면의 x 값
   * @param y1 첫 번째 터치한 화면의 y 값
   * @param x2 두 번째 터치한 화면의 x 값
   * @param y2 두 번째 터치한 화면의 y 값
   */
  public calculateDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  /**
   * 두 번째 값에서 이동량을 구함.
   * 다른 방향인 경우 이동량 0. 같은 방향인 경우 절대값이 작은 값을 참조.
   *
   * @param v1 첫 번째 이동량
   * @param v2 두 번째 이동량
   *
   * @return 작은 이동량
   */
  public calculateMovingAmount(v1: number, v2: number): number {
    if (v1 > 0.0 != v2 > 0.0) {
      return 0.0;
    }

    const sign: number = v1 > 0.0 ? 1.0 : -1.0;
    const absoluteValue1 = Math.abs(v1);
    const absoluteValue2 = Math.abs(v2);
    return (
      sign * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2)
    );
  }

  _startY: number; // 터치를 시작했을 때의 x 값
  _startX: number; // 터치를 시작했을 때의 y 값
  _lastX: number; // 싱글 터치 시의 x 값
  _lastY: number; // 싱글 터치 시의 y 값
  _lastX1: number; // 더블 터치 시 첫 번째 x 값
  _lastY1: number; // 더블 터치 시 첫 번째 y 값
  _lastX2: number; // 더블 터치 시 두 번째 x 값
  _lastY2: number; // 더블 터치 시 두 번째 y 값
  _lastTouchDistance: number; // 2개 이상의 터치 시 손가락 간 거리
  _deltaX: number; // 이전 값에서 현재 값까지의 x 이동 거리
  _deltaY: number; // 이전 값에서 현재 값까지의 y 이동 거리
  _scale: number; // 이 프레임에서 곱할 확대율. 확대 작업 중이 아닐 때는 1.
  _touchSingle: boolean; // 싱글 터치 시 true
  _flipAvailable: boolean; // 플릭이 유효한지 여부
}
