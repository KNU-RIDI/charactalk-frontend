export interface Message {
  id: number
  sender: string
  profileImage: string
  text: string
  isTyping: boolean
  timestamp: string
}

export type ChatRoomType = "SINGLE" | "GROUP"

export interface CreateChatRoomRequest {
  characterId: number
  name: string
  type: ChatRoomType
}

export interface CreateChatRoomResponse {
  chatRoomId: number
  character: CharacterSummary
}

export interface CharacterSummary {
  characterId: number
  name: string
  description: string
  imageUrl: string
}
