import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { ChatTopicBarItemComponent } from '../chat-topic-bar-item/chat-topic-bar-item.component';
import { ITopic } from '../../../_models/topic.model';

@Component({
  selector: 'app-chat-left-sidebar',
  standalone: true,
  imports: [CommonModule, ChatTopicBarItemComponent],
  templateUrl: './chat-left-sidebar.component.html',
  styleUrl: './chat-left-sidebar.component.scss',
})
export class ChatLeftSidebarComponent {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedLeft$());

  conversations: ITopic[] = [
    { id: 0, type: 'group', name: 'Grupa Projektowa' },
    {
      id: 1,
      type: 'private',
      name: 'Jan Kowalski',
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: 2,
      type: 'private',
      name: 'Anna Nowak',
      isOnline: false,
      lastSeen: new Date(Date.now() - 3600 * 1000),
    },
  ];

  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.setCollapsedLeft(!this.isCollapsed$());
  }
}
