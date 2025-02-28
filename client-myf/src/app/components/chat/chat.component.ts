import { Component, OnInit } from '@angular/core';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatLeftSidebarComponent } from './chat-left-sidebar/chat-left-sidebar.component';
import { ChatRightSidebarComponent } from './chat-right-sidebar/chat-right-sidebar.component';
import { WebsocketService } from '../../_services/WebSocketService/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ChatMainComponent,
    ChatLeftSidebarComponent,
    ChatRightSidebarComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.initWebSocket();
  }
}
