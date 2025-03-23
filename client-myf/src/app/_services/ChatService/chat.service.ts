import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, OnInit, signal } from '@angular/core';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';
import {
  IConversation,
  IConversationsResponseDto,
} from '../../_models/DTOs/conversation.model';
import { IToolbarUser } from '../../_models/user.model';
import { WebsocketService } from '../WebSocketService/websocket.service';
import { environment } from '../../../environments/environment.development';
import { IMessageRequestDto } from '../../_models/DTOs/message.model';
import { ApiService } from '../ApiService/api.service';
import { Observable } from 'rxjs';
import { IBaseReponse } from '../../_models/DTOs/base-reponse.model';

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
  conversations = signal<IConversation[]>([]);

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  apiService = inject(ApiService);

  getAllClients() {
    return this.http.get(`${environment.API_URL}/users`);
  }

  getAllChats(): Observable<IBaseReponse<IConversationsResponseDto>> {
    return this.apiService.httpGet<IConversationsResponseDto>('/chats');
  }

  setCurrentChat(chat: any) {
    this.currentChatId.set(chat.id);
    this.currentReceiverId.set(chat.users[0]);
    this.getMesseges(this.currentChatId()).subscribe((data) => {
      this.currentChatMessages.set(data);
    });
    console.log('Current receiver:', this.currentReceiverId());
  }

  setCurrentReceiver(receiverId: IConversation) {
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
