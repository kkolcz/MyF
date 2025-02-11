import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-left-sidebar.component.html',
  styleUrl: './chat-left-sidebar.component.scss',
})
export class ChatLeftSidebarComponent {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
