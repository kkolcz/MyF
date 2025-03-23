import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { ChatTopicBarItemComponent } from './chat-topic-bar-item/chat-topic-bar-item.component';
import {
  IConversationResponseDto,
  IConversationsResponse,
} from '../../../_models/DTOs/conversation.model';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { ApiService } from '../../../_services/ApiService/api.service';
import { IBaseReponse } from '../../../_models/DTOs/base-reponse.model';

@Component({
  selector: 'app-chat-left-sidebar',
  standalone: true,
  imports: [CommonModule, ChatTopicBarItemComponent],
  templateUrl: './chat-left-sidebar.component.html',
  styleUrl: './chat-left-sidebar.component.scss',
})
export class ChatLeftSidebarComponent implements OnInit {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedLeft$());

  chatService = inject(ChatService);

  conversations = this.chatService.conversations;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.getConversations();
  }

  getConversations() {
    this.chatService
      .getAllChats()
      .subscribe((res: IBaseReponse<IConversationsResponse>) => {
        console.log('Conversations:', res.data.chats);
        this.chatService.conversations.set(res.data.chats);
      });
  }

  toggleSidebar() {
    this.sidebarService.setCollapsedLeft(!this.isCollapsed$());
  }
}
