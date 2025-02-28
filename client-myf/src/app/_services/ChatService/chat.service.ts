import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';
import { ITopic } from '../../_models/topic.model';
import { IToolbarUser } from '../../_models/user.model';
import {
  ISendNewMessage,
  WebsocketService,
} from '../WebSocketService/websocket.service';
import { INewMessageRequest } from '../../_models/message.model';

export interface IMessageSend {
  content: string;
  senderId: string;
  receiverId: string;
  messageType: string;
  chatId: string;
}

export interface IResponseCreateChat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  type: string;
}

export interface IChat {
  id: string;
  name: string;
  lastMesage: string;
  lastMessageTime: string;
  type: string;
  users: string[];
}

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

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {}

  getAllClients() {
    return this.http.get('http://localhost:8080/api/v1/users');
  }

  getAllChats() {
    return this.http.get<ITopic[]>('http://localhost:8080/api/v1/chats');
  }

  newChat(senderId: string, receiverId: string) {
    return this.http.post<IResponseCreateChat>(
      // `http://localhost:8080/api/v1/chats?sender-id=${senderId}&receiver-id=${receiverId}`,
      `http://localhost:8080/api/v1/chat/create/private?receiver-id=${receiverId}`,
      {}
    );
  }

  setCurrentChat(chat: any) {
    console.log('Current chat:', chat);
    this.currentChatId.set(chat.id);
    console.log(chat);
    this.currentReceiverId.set(chat.users[0]);
    this.getMesseges(this.currentChatId()).subscribe((data) => {
      console.log('Messages:', data);
      this.currentChatMessages.set(data);
    });
    console.log('Current receiver:', this.currentReceiverId());
  }

  setCurrentReceiver(receiverId: ITopic) {
    this.currentChatUser.set({
      fullNamed: receiverId.name,
      isOnline: receiverId.recipientOnline,
      avatarUrl: '',
    });
  }

  getMesseges(chatId: any) {
    return this.http.get(
      `http://localhost:8080/api/v1/chat/${this.currentChatId()}/messages`
    );
  }

  sendMessage(message: IMessageSend) {
    const messageObj: ISendNewMessage = {
      content: message.content,
      chatId: this.currentChatId(),
      type: 'TEXT',
    };

    this.websocketService.sendMessage(messageObj);
  }
}
