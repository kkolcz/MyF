import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, OnInit, signal } from '@angular/core';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';
import { IConversationResponseDto } from '../../_models/DTOs/conversation.model';
import { IToolbarUser } from '../../_models/user.model';
import { WebsocketService } from '../WebSocketService/websocket.service';
import { environment } from '../../../environments/environment.development';
import { IMessageRequestDto } from '../../_models/DTOs/message.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService implements OnInit {
  username: string = '';
  currentChatId = signal<any>(null);
  currentReceiverId = signal<any>(null);
  currentChatMessages = signal<any>(null);
  currentChatUser = signal<IToolbarUser>({
    fullNamed: '',
    isOnline: false,
    avatarUrl: '',
  });
  conversations = signal<IConversationResponseDto[]>([]);

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  getAllClients() {
    return this.http.get(`${environment.API_URL}/users`);
  }

  getAllChats() {
    return this.http.get<IConversationResponseDto[]>(
      `${environment.API_URL}/chats`
    );
  }

  setCurrentChat(chat: any) {
    this.currentChatId.set(chat.id);
    this.currentReceiverId.set(chat.users[0]);
    this.getMesseges(this.currentChatId()).subscribe((data) => {
      this.currentChatMessages.set(data);
    });
    console.log('Current receiver:', this.currentReceiverId());
  }

  setCurrentReceiver(receiverId: IConversationResponseDto) {
    this.currentChatUser.set({
      fullNamed: receiverId.name,
      isOnline: receiverId.recipientOnline,
      avatarUrl: '',
    });
  }

  getMesseges(chatId: any) {
    return this.http.get(
      `${environment.API_URL}/chat/${this.currentChatId()}/messages`
    );
  }

  sendMessage(message: IMessageRequestDto) {
    const messageObj: IMessageRequestDto = {
      content: message.content,
      chatId: this.currentChatId(),
      type: 'TEXT',
      senderId: this.keycloak.keycloak.tokenParsed?.sub,
    };

    this.injector.get(WebsocketService).handleSendMessage(messageObj);
  }
}
