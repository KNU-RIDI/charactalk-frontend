/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';

/**
 * Sample App에서 사용하는 상수
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// 캔버스의 수
export const CanvasNum = 1;

// 화면
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 상대 경로
export const ResourcesPath = `${window.location.origin}/Resources/`;

// 모델 뒤에 있는 배경 이미지 파일
export const BackImageName = 'back_class_normal.png';

// 기어
export const GearImageName = 'icon_gear.png';

// 종료 버튼
export const PowerImageName = 'CloseNormal.png';

// 모델 정의---------------------------------------------
// 모델을 배치한 디렉토리 이름 배열
// 디렉토리 이름과 model3.json의 이름을 일치시켜 둘 것
export const ModelDir: string[] = ['Mao'];
export const ModelDirSize: number = ModelDir.length;

// 외부 정의 파일(json)과 일치시킴
export const MotionGroupIdle = 'Idle'; // 아이들링
export const MotionGroupTapBody = 'TapBody'; // 몸을 탭했을 때

// 외부 정의 파일(json)과 일치시킴
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// 모션의 우선순위 상수
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// MOC3의 일관성 검증 옵션
export const MOCConsistencyValidationEnable = true;

// 디버그용 로그 표시 옵션
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Framework에서 출력하는 로그의 레벨 설정
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// 기본 렌더 타겟 크기
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
