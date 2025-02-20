import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { IMessage } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';
import { ITopic } from '../../_models/topic.model';
import { IToolbarUser } from '../../_models/user.model';

export interface IMessageSend {
  content: string;
  senderId: string;
  receiverId: string;
  messageType: string;
  chatId: string;
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

  constructor(private http: HttpClient, private keycloak: KeycloakService) {}

  ngOnInit(): void {}

  getAllClients() {
    return this.http.get('http://localhost:8080/api/v1/users');
  }

  getAllChats() {
    return this.http.get<ITopic[]>('http://localhost:8080/api/v1/chats');
  }

  newChat(senderId: string, receiverId: string) {
    return this.http.post(
      `http://localhost:8080/api/v1/chats?sender-id=${senderId}&receiver-id=${receiverId}`,
      {}
    );
  }

  setCurrentChat(chat: any) {
    console.log('Current chat:', chat);
    this.currentChatId.set(chat);
    this.getMesseges(this.currentChatId()).subscribe((data) => {
      console.log('Messages:', data);
      this.currentChatMessages.set(data);
    });
  }

  setCurrentReceiver(receiverId: ITopic) {
    this.currentReceiverId.set(receiverId.receiverId);

    this.currentChatUser.set({
      fullNamed: receiverId.name,
      isOnline: receiverId.recipientOnline,
      avatarUrl: '',
    });
  }

  getMesseges(chatId: any) {
    return this.http.get(
      `http://localhost:8080/api/v1/messages/chat/${this.currentChatId()}`
    );
  }

  sendMessage(message: IMessageSend) {
    const messageObj: IMessageSend = {
      content: message.content,
      senderId: this.keycloak.userId,
      receiverId: this.currentReceiverId(),
      messageType: 'TEXT',
      chatId: this.currentChatId(),
    };

    console.log('newMessage:', messageObj);
    console.log('Messages list:', this.currentChatMessages());
    // console.log('Current chat:', this.currentReceiverId());

    this.http
      .post(`http://localhost:8080/api/v1/messages`, messageObj)
      .subscribe((data) => {
        console.log('Message sent:', data);
      });
  }
}
