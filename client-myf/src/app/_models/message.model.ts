export interface INewMessageRequest {
  content: string;
  chatId: string;
  senderId: string;
  type: 'TEXT';
}

export interface IRecrivedMessages {
  id: number;
  content: string;
  createdAt: string;
  media: string;
  receiverId: string;
  senderId: string;
  state: 'SENT' | 'DELIVERED' | 'READ';
  type: 'TEXT';
}
