/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

/**
 * 플랫폼 의존 기능을 추상화하는 Cubism Platform Abstraction Layer.
 *
 * 파일 읽기나 시간 가져오기 등의 플랫폼에 의존하는 함수를 모은다.
 */
export class LAppPal {
  /**
   * 파일을 바이트 데이터로 읽어들인다
   *
   * @param filePath 읽기 대상 파일의 경로
   * @return
   * {
   *      buffer,   읽어들인 바이트 데이터
   *      size        파일 크기
   * }
   */
  public static loadFileAsBytes(
    filePath: string,
    callback: (arrayBuffer: ArrayBuffer, size: number) => void
  ): void {
    fetch(filePath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => callback(arrayBuffer, arrayBuffer.byteLength));
  }

  /**
   * 델타 시간(이전 프레임과의 차이)을 가져온다
   * @return 델타 시간[ms]
   */
  public static getDeltaTime(): number {
    return this.deltaTime;
  }

  public static updateTime(): void {
    this.currentFrame = Date.now();
    this.deltaTime = (this.currentFrame - this.lastFrame) / 1000;
    this.lastFrame = this.currentFrame;
  }

  /**
   * 메시지를 출력한다
   * @param message 문자열
   */
  public static printMessage(message: string): void {
    console.log(message);
  }

  static lastUpdate = Date.now();

  static currentFrame = 0.0;
  static lastFrame = 0.0;
  static deltaTime = 0.0;
}
