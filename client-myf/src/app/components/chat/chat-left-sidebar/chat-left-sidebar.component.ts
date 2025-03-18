import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { ChatTopicBarItemComponent } from './chat-topic-bar-item/chat-topic-bar-item.component';
import { ITopic } from '../../../_models/topic.model';
import { ChatService } from '../../../_services/ChatService/chat.service';

@Component({
  selector: 'app-chat-left-sidebar',
  standalone: true,
  imports: [CommonModule, ChatTopicBarItemComponent],
  templateUrl: './chat-left-sidebar.component.html',
  styleUrl: './chat-left-sidebar.component.scss',
})
export class ChatLeftSidebarComponent implements OnInit {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedLeft$());

  conversations: ITopic[] = [];

  constructor(
    private sidebarService: SidebarService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getAllChats().subscribe((data: ITopic[]) => {
      console.log('All fetched topics:', data);
      this.conversations = data;
    });
  }

  toggleSidebar() {
    this.sidebarService.setCollapsedLeft(!this.isCollapsed$());
  }
}
