export interface IConversationRequestDto {}

export interface IConversationsResponseDto {
  chats: IConversation[];
}

export interface IConversation {
  id: string;
  lastMessage: string | null;
  lastMessageTime: string | null;
  name: string;
  receiverId: string;
  recipientOnline: boolean;
  senderId: string;
  unreadCount: number;
}

// interface IConversation {}

export interface IConversationCreateRequestDto {}

export interface IConversationCreateResponseDto {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  type: string;
}
