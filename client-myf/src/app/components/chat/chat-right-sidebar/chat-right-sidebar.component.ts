import { Component, computed } from '@angular/core';
import { ChatUserBarItemComponent } from '../chat-user-bar-item/chat-user-bar-item.component';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';

@Component({
  selector: 'app-chat-right-sidebar',
  standalone: true,
  imports: [ChatUserBarItemComponent],
  templateUrl: './chat-right-sidebar.component.html',
  styleUrl: './chat-right-sidebar.component.scss',
})
export class ChatRightSidebarComponent {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedRight$());
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.setCollapsedRight(!this.isCollapsed$());
  }

  users = [
    { id: 0, nickname: 'Jan Kowalski', isOnline: true, lastSeen: new Date() },
    {
      id: 1,
      nickname: 'Anna Nowak',
      isOnline: false,
      lastSeen: new Date(),
    },
    {
      id: 2,
      nickname: 'Piotr Wiśniewski',
      isOnline: true,
      lastSeen: new Date(),
    },
  ];
}
