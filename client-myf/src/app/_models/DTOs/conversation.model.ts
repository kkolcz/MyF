export interface IConversationRequestDto {}

export interface IConversationResponseDto {
  id: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  name: string;
  receiverId: string;
  recipientOnline: boolean;
  senderId: string;
  unreadCount: number;
}

export interface IConversationCreateRequestDto {}

export interface IConversationCreateResponseDto {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  type: string;
}
