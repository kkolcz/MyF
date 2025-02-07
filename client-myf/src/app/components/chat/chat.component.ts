import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IMessage, WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit, OnDestroy {
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
