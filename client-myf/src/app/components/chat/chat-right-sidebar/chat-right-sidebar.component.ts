import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-right-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './chat-right-sidebar.component.html',
  styleUrl: './chat-right-sidebar.component.scss',
})
export class ChatRightSidebarComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
