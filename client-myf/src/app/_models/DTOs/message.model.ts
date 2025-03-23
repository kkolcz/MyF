export interface IMessageRequestDto {
  chatId: string;
  content: string;
  type: string;
  senderId: string | undefined;
}

export interface IMessageResponseDto {}
