import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../services/websocket.service';

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
  messages: any[] = [];
  messageInput: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit() {
    this.websocketService.connect();
  }

  ngOnDestroy() {}

  onUsernameSubmit() {
    if (this.usernameInput.trim()) {
      this.username = this.usernameInput;
    }
  }

  sendMessage() {
    const messageObj = {
      sender: this.username,
      content: this.messageInput,
      timestamp: new Date(),
    };

    console.log(messageObj);
  }
}
