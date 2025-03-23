export interface IConversationRequestDto {}

export interface IConversationResponseDto {}

export interface IConversationCreateRequestDto {}

export interface IConversationCreateResponseDto {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  type: string;
}
