import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../../_services/WebSocketService/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { IRecrivedMessages } from '../../../_models/message.model';
import { IToolbarUser } from '../../../_models/user.model';
import { IMessage } from '@stomp/stompjs';
import { IMessageRequestDto } from '../../../_models/DTOs/message.model';

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
    effect(() => {
      this.messages = this.chatService.currentChatMessages();
      this.currentChatUser = this.chatService.currentChatUser();
      this.currentUserId = this.keycloak.userId;
      console.log('Fetch all messages for current chat:', this.messages);
    });
  }

  ngOnInit() {
    this.fetchAllChats();
    // this.fetchAllClients();
    this.registerMessageHandler();
  }

  ngOnDestroy() {}

  // fetchAllClients(): void {
  //   this.chatService.getAllClients().subscribe((data) => {
  //     console.log('Fetch all clients:', data);
  //   });
  // }

  fetchAllChats(): void {
    this.chatService.getAllChats().subscribe((data) => {
      console.log('Fetch all chats:', data);
    });
  }

  registerMessageHandler(): void {
    this.websocketService.registerMessageHandler((message: any) => {
      console.log('Received new message from WS:', message);
      this.messages.push(message);
    });
  }

  onUsernameSubmit(): void {
    if (this.usernameInput.trim()) {
      this.username = this.usernameInput;
    }
  }

  sendMessage(): void {
    const messageObj: IMessageRequestDto = {
      chatId: this.chatService.currentChatId(),
      content: this.messageInput,
      type: 'TEXT',
      senderId: undefined,
    };

    this.chatService.sendMessage(messageObj);
  }
}
