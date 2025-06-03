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

export interface Message {
  id: number
  sender: string
  profileImage: string
  text: string
  isTyping: boolean
  timestamp: string
}

export interface RawMessage {
  chatId: number
  senderType: "MEMBER" | "CHARACTER"
  message: string
  timestamp: string
  characterId: number | null
}

export interface ChatRoomDetail {
  chatRoomId: number
  name: string
  type: ChatRoomType
  characterId: number
  characterName: string
  characterDescription: string
  characterImageUrl: string
}

export interface ChatRoomCardResponse {
  chatRoomId: number
  characterName: string
  characterImageUrl: string
  lastMessage: string
  lastMessageTime: string
}
