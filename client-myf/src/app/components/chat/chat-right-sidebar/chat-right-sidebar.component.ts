import { Component, computed, OnInit } from '@angular/core';
import { ChatUserBarItemComponent } from '../chat-user-bar-item/chat-user-bar-item.component';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { IUser } from '../../../_models/user.model';

@Component({
  selector: 'app-chat-right-sidebar',
  standalone: true,
  imports: [ChatUserBarItemComponent],
  templateUrl: './chat-right-sidebar.component.html',
  styleUrl: './chat-right-sidebar.component.scss',
})
export class ChatRightSidebarComponent implements OnInit {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedRight$());
  constructor(
    private sidebarService: SidebarService,
    private keycloak: KeycloakService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatService.getAllClients().subscribe((data) => {
      console.log('All clients:', data);
      this.users = data as IUser[];
    });
  }

  toggleSidebar() {
    this.sidebarService.setCollapsedRight(!this.isCollapsed$());
  }

  users: IUser[] = [
    {
      id: '0',
      firstName: 'Jan',
      lastname: 'Kowalski',
      email: 'test',
      lastSeen: '',
      online: true,
    },

    // {
    //   id: 1,
    //   nickname: 'Anna Nowak',
    //   isOnline: false,
    //   lastSeen: new Date(),
    // },
    // {
    //   id: 2,
    //   nickname: 'Piotr Wiśniewski',
    //   isOnline: true,
    //   lastSeen: new Date(),
    // },
  ];
}
