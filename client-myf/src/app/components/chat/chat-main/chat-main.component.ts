import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import {
  IMessage,
  WebsocketService,
} from '../../../_services/WebSocketService/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ChatService,
  IMessageSend,
} from '../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { IRecrivedMessages } from '../../../_models/message.model';
import { IToolbarUser } from '../../../_models/user.model';

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit, OnDestroy {
  usernameInput: string = '';
  username: string = 'anonymous';
  messages: IRecrivedMessages[] = [];
  messageInput: string = '';
  currentChatUser: IToolbarUser = {
    fullNamed: '',
    isOnline: false,
    avatarUrl: '',
    lastSeen: '',
  };

  currentUserId: string = '';

  constructor(
    private websocketService: WebsocketService,
    private chatService: ChatService,
    private keycloak: KeycloakService
  ) {
    // effect(() => {
    // this.messages = this.websocketService.messages();
    // console.log('Nowe wiadomości:', this.messages);
    // });

    effect(() => {
      this.messages = this.chatService.currentChatMessages();
      this.currentChatUser = this.chatService.currentChatUser();
      this.currentUserId = this.keycloak.userId;
      console.log('Wiadomości z czatu:', this.messages);
    });

    this.chatService.getAllClients().subscribe((data) => {
      console.log('All clients:', data);
    });

    this.chatService.getAllChats().subscribe((data) => {
      console.log('All chats:', data);
    });

    // this.get
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onUsernameSubmit() {
    if (this.usernameInput.trim()) {
      this.username = this.usernameInput;
      this.websocketService.connect(this.username);
    }
  }

  sendMessage() {
    const messageObj: any = {
      content: this.messageInput,
      messageType: 'TEXT',
    };

    this.chatService.sendMessage(messageObj);

    // this.websocketService.sendMessage(messageObj);
  }
}
