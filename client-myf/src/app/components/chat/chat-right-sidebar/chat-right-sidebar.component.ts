import { Component, computed, OnInit } from '@angular/core';
import { ChatUserBarItemComponent } from '../chat-user-bar-item/chat-user-bar-item.component';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { IUser } from '../../../_models/user.model';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../_services/FriendsService/friends.service';
import { ChatUserBarInvitationComponent } from "../chat-user-bar-invitation/chat-user-bar-invitation.component";

@Component({
  selector: 'app-chat-right-sidebar',
  standalone: true,
  imports: [ChatUserBarItemComponent, FormsModule, ChatUserBarInvitationComponent],
  templateUrl: './chat-right-sidebar.component.html',
  styleUrl: './chat-right-sidebar.component.scss',
})
export class ChatRightSidebarComponent implements OnInit {
  isCollapsed$ = computed(() => this.sidebarService.isCollapsedRight$());


  constructor(
    private sidebarService: SidebarService,
    private keycloak: KeycloakService,
    private chatService: ChatService,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.chatService.getAllClients().subscribe((data) => {
      console.log('All clients:', data);
      this.users = data as IUser[];
    });
  }

  toggleSidebar(): void {
    this.sidebarService.setCollapsedRight(!this.isCollapsed$());
  }



  users: IUser[] = [
    {
      id: '0',
      firstName: 'Jan',
      lastName: 'Kowalski',
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
