import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import {
  IMessage,
  WebsocketService,
} from '../../../_services/WebSocketService/websocket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-main',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-main.component.html',
  styleUrl: './chat-main.component.scss',
})
export class ChatMainComponent implements OnInit, OnDestroy {
  usernameInput: string = '';
  username: string = '';
  messages: IMessage[] = [];
  messageInput: string = '';

  constructor(private websocketService: WebsocketService) {
    effect(() => {
      this.messages = this.websocketService.messages();
      console.log('Nowe wiadomości:', this.messages);
    });
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
    const messageObj: IMessage = {
      sender: this.username,
      content: this.messageInput,
      messageType: 'CHAT',
    };

    this.websocketService.sendMessage(messageObj);
  }
}
