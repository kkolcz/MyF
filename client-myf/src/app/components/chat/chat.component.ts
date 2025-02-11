import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatMainComponent } from "./chat-main/chat-main.component";
import { ChatLeftSidebarComponent } from "./chat-left-sidebar/chat-left-sidebar.component";
import { ChatRightSidebarComponent } from "./chat-right-sidebar/chat-right-sidebar.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ChatMainComponent, ChatLeftSidebarComponent, ChatRightSidebarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {}
