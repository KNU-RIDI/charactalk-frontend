# 🎭 AI 디지털 휴먼 기반 대화형 웹 플랫폼

> LLM + STT + TTS + Live2D를 통합한  
> **몰입형 캐릭터 AI 인터랙션 플랫폼**

---

## 🧩 프로젝트 개요

본 프로젝트는 소설 속 캐릭터와 실시간으로 대화할 수 있는  
**디지털 휴먼 기반 AI 웹 플랫폼**을 구현한 프로젝트이며,
경북대학교 컴퓨터학부와 **리디(RIDI)**의 산학협력 프로젝트로 진행되었습니다.

기존 챗봇이 정보 제공 중심이었다면,  
본 프로젝트는 **캐릭터 세계관·성격·말투를 유지하는 감성형 대화 시스템**을 목표로 설계되었습니다.

- 📅 개발 기간: 2025.03 ~ 2025.06 (4개월)
- 👥 팀 구성:
  
| 역할 | 이름 |
|------|------|
| Backend | 신찬규 |
| Backend | 박재영 |
| Frontend | 배민중 |
| Frontend | 윤수현 |

---

## 🎯 핵심 목표

- 캐릭터 고유 설정을 반영하는 LLM 대화 구조 구현
- 음성 기반 인터랙션(STT/TTS) 통합
- 실시간 스트리밍 기반 채팅 UX 구현
- Live2D 기반 감정 표현 UI 설계
- 사용자 몰입감을 극대화하는 인터랙션 구현

---

## 🛠 Tech Stack

● 백엔드 기술 스택: Java, Spring Boot, Spring WebFlux, MySQL
● 프론트엔드 기술 스택: TypeScript, React, tailwindCSS
● 인공지능 기술 스택: Python3, LangChain, FastAPI

---

## 🏗 시스템 아키텍처
<img width="643" height="353" alt="image" src="https://github.com/user-attachments/assets/5f31d869-3bc2-4536-8616-bfe8377a055e" />

## 🏗 시스템 다이어그램
<img width="500" height="542" alt="image" src="https://github.com/user-attachments/assets/0a544b06-c31f-4a5c-9b47-dc525d7a134f" />

---


## 🚀 주요 기능

### 1️⃣ 캐릭터 기반 LLM 대화 시스템
- 프롬프트 기반 캐릭터 성격 유지
- 대화 히스토리 기반 문맥 유지
- 실시간 스트리밍 응답 출력

---

### 2️⃣ 실시간 채팅 UI
- 채팅 말풍선 컴포넌트 분리 설계
- 캐릭터 / 사용자 메시지 구분 UI
- 타이핑 애니메이션 구현
- 메시지 순차 출력 처리

---

### 3️⃣ 음성 인터랙션 파이프라인
<img width="181" height="300" alt="image" src="https://github.com/user-attachments/assets/130dd3d3-9889-408d-b043-10f3adf7645e" />

- 마이크 버튼 기반 녹음 UI 구현
- 음성 입력 상태 시각화
- 음성 응답 재생 상태 UI 반영

---

### 4️⃣ Live2D 기반 감정 표현

- 캐릭터 모델 화면 중앙 배치
- 감정 상태에 따른 표정 변경
- 음성 출력 시 입모양 애니메이션 처리
- 실제 통화처럼 느껴지는 UI 설계

---

## 🖥 서비스 화면 구성

### 🏠 메인 화면
<img width="643" height="349" alt="image" src="https://github.com/user-attachments/assets/06617f23-af91-4c3d-aecf-91765fd8b4fc" />
- 베스트 캐릭터 추천
- 장르별 캐릭터 탐색
- 검색 기능
- 채팅방 생성 및 이동

### 💬 채팅 화면
<img width="643" height="350" alt="image" src="https://github.com/user-attachments/assets/fa9d86f4-233a-4144-813d-62df4abc097f" />
- 상단 캐릭터 프로필 영역
- 실시간 채팅 영역
- 입력창 + 전송 버튼
- 음성 통화 전환 버튼

### 🎙 음성 채팅 화면
<img width="643" height="350" alt="image" src="https://github.com/user-attachments/assets/c0bd96c2-979e-450c-a8b6-d9c698c9f8d9" />
- Live2D 캐릭터 중앙 배치
- 마이크 버튼 인터랙션
- 통화 종료 버튼
- 감정 기반 표정 변화

---



