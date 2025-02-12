import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';

@Component({
  selector: 'app-chat-left-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-left-sidebar.component.html',
  styleUrl: './chat-left-sidebar.component.scss',
})
export class ChatLeftSidebarComponent {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedLeft$());
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.setCollapsedLeft(!this.isCollapsed$());
  }
}
