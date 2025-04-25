/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { csmVector } from '@framework/type/csmvector';
import { CubismFramework, Option } from '@framework/live2dcubismframework';
import * as LAppDefine from './lappdefine';
import { LAppPal } from './lapppal';
import { LAppSubdelegate } from './lappsubdelegate';
import { CubismLogError } from '@framework/utils/cubismdebug';

export let s_instance: LAppDelegate = null;

/**
 * 애플리케이션 클래스.
 * Cubism SDK의 관리를 수행한다.
 */
export class LAppDelegate {
  /**
   * 클래스의 인스턴스(싱글톤)를 반환한다.
   * 인스턴스가 생성되지 않은 경우 내부에서 인스턴스를 생성한다.
   *
   * @return 클래스의 인스턴스
   */
  public static getInstance(): LAppDelegate {
    if (s_instance == null) {
      s_instance = new LAppDelegate();
    }

    return s_instance;
  }

  /**
   * 클래스의 인스턴스(싱글톤)를 해제한다.
   */
  public static releaseInstance(): void {
    if (s_instance != null) {
      s_instance.release();
    }

    s_instance = null;
  }

  /**
   * 포인터가 활성화될 때 호출된다.
   */
  private onPointerBegan(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointBegan(e.pageX, e.pageY);
    }
  }

  /**
   * 포인터가 움직일 때 호출된다.
   */
  private onPointerMoved(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointMoved(e.pageX, e.pageY);
    }
  }

  /**
   * 포인터가 비활성화될 때 호출된다.
   */
  private onPointerEnded(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onPointEnded(e.pageX, e.pageY);
    }
  }

  /**
   * 포인터가 취소될 때 호출된다.
   */
  private onPointerCancel(e: PointerEvent): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().onTouchCancel(e.pageX, e.pageY);
    }
  }

  /**
   * 캔버스를 리사이즈하고 뷰를 다시 초기화한다.
   */
  public onResize(): void {
    for (let i = 0; i < this._subdelegates.getSize(); i++) {
      this._subdelegates.at(i).onResize();
    }
  }

  /**
   * 실행 처리.
   */
  public run(): void {
    // 메인 루프
    const loop = (): void => {
      // 인스턴스의 존재 여부 확인
      if (s_instance == null) {
        return;
      }

      // 시간 업데이트
      LAppPal.updateTime();

      for (let i = 0; i < this._subdelegates?.getSize(); i++) {
        this._subdelegates.at(i).update();
      }

      // 루프를 위해 재귀 호출
      requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * 해제한다.
   */
  private release(): void {
    this.releaseEventListener();
    this.releaseSubdelegates();

    // Cubism SDK 해제
    CubismFramework.dispose();

    this._cubismOption = null;
  }

  /**
   * 이벤트 리스너를 해제한다.
   */
  private releaseEventListener(): void {
    document.removeEventListener('pointerup', this.pointBeganEventListener);
    this.pointBeganEventListener = null;
    document.removeEventListener('pointermove', this.pointMovedEventListener);
    this.pointMovedEventListener = null;
    document.removeEventListener('pointerdown', this.pointEndedEventListener);
    this.pointEndedEventListener = null;
    document.removeEventListener('pointerdown', this.pointCancelEventListener);
    this.pointCancelEventListener = null;
  }

  /**
   * Subdelegate를 해제한다.
   */
  private releaseSubdelegates(): void {
    for (
      let ite = this._subdelegates.begin();
      ite.notEqual(this._subdelegates.end());
      ite.preIncrement()
    ) {
      ite.ptr().release();
    }

    this._subdelegates.clear();
    this._subdelegates = null;
  }

  /**
   * APP에 필요한 것을 초기화한다.
   */
  public initialize(): boolean {
    // Cubism SDK 초기화
    this.initializeCubism();

    this.initializeSubdelegates();
    this.initializeEventListener();

    return true;
  }

  /**
   * 이벤트 리스너를 설정한다.
   */
  private initializeEventListener(): void {
    this.pointBeganEventListener = this.onPointerBegan.bind(this);
    this.pointMovedEventListener = this.onPointerMoved.bind(this);
    this.pointEndedEventListener = this.onPointerEnded.bind(this);
    this.pointCancelEventListener = this.onPointerCancel.bind(this);

    // 포인터 관련 콜백 함수 등록
    document.addEventListener('pointerdown', this.pointBeganEventListener, {
      passive: true
    });
    document.addEventListener('pointermove', this.pointMovedEventListener, {
      passive: true
    });
    document.addEventListener('pointerup', this.pointEndedEventListener, {
      passive: true
    });
    document.addEventListener('pointercancel', this.pointCancelEventListener, {
      passive: true
    });
  }

  /**
   * Cubism SDK 초기화
   */
  private initializeCubism(): void {
    LAppPal.updateTime();

    // Cubism 설정
    this._cubismOption.logFunction = LAppPal.printMessage;
    this._cubismOption.loggingLevel = LAppDefine.CubismLoggingLevel;
    CubismFramework.startUp(this._cubismOption);

    // Cubism 초기화
    CubismFramework.initialize();
  }

  /**
   * Canvas를 생성 및 배치하고 Subdelegate를 초기화한다.
   */
  private initializeSubdelegates(): void {
    this._canvases.prepareCapacity(LAppDefine.CanvasNum);
    this._subdelegates.prepareCapacity(LAppDefine.CanvasNum);
    for (let i = 0; i < LAppDefine.CanvasNum; i++) {
      const canvas: HTMLCanvasElement = document.getElementById('live2d-canvas') as HTMLCanvasElement;
      this._canvases.pushBack(canvas);
    }

    for (let i = 0; i < this._canvases.getSize(); i++) {
      const subdelegate = new LAppSubdelegate();
      subdelegate.initialize(this._canvases.at(i));
      this._subdelegates.pushBack(subdelegate);
    }

    for (let i = 0; i < LAppDefine.CanvasNum; i++) {
      if (this._subdelegates.at(i).isContextLost()) {
        CubismLogError(
          `The context for Canvas at index ${i} was lost, possibly because the acquisition limit for WebGLRenderingContext was reached.`
        );
      }
    }
  }

  /**
   * Private 생성자
   */
  private constructor() {
    this._cubismOption = new Option();
    this._subdelegates = new csmVector<LAppSubdelegate>();
    this._canvases = new csmVector<HTMLCanvasElement>();
  }

  /**
   * Cubism SDK Option
   */
  private _cubismOption: Option;

  /**
   * 조작 대상 canvas 요소
   */
  private _canvases: csmVector<HTMLCanvasElement>;

  /**
   * Subdelegate
   */
  private _subdelegates: csmVector<LAppSubdelegate>;

  /**
   * 등록된 이벤트 리스너 함수 객체
   */
  private pointBeganEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 등록된 이벤트 리스너 함수 객체
   */
  private pointMovedEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 등록된 이벤트 리스너 함수 객체
   */
  private pointEndedEventListener: (this: Document, ev: PointerEvent) => void;

  /**
   * 등록된 이벤트 리스너 함수 객체
   */
  private pointCancelEventListener: (this: Document, ev: PointerEvent) => void;
}
