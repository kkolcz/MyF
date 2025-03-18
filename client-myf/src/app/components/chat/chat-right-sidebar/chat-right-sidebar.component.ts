import { Component, computed, inject, OnInit } from '@angular/core';
import { ChatUserBarItemComponent } from './chat-user-bar-item/chat-user-bar-item.component';
import { SidebarService } from '../../../_services/SidebarService/sidebar.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { IUser } from '../../../_models/user.model';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../_services/FriendsService/friends.service';
import { ChatUserBarInvitationComponent } from './chat-user-bar-invitation/chat-user-bar-invitation.component';
import { ChatFriendBarItemComponent } from './chat-user-bar-friend-item/chat-friend-bar-item.component';
import { ChatUserBarInvitationItemComponent } from './chat-user-bar-invitation-item/chat-user-bar-invitation-item.component';
import { JsonPipe } from '@angular/common';

interface IRecrivedInvitation {
  id: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
  };
  receiver: {
    id: string;
    firstName: string;
    lastName: string;
  };
  status: string;
}

@Component({
  selector: 'app-chat-right-sidebar',
  standalone: true,
  imports: [
    ChatFriendBarItemComponent,
    FormsModule,
    ChatUserBarInvitationComponent,
    ChatUserBarInvitationItemComponent,
    JsonPipe,
  ],
  templateUrl: './chat-right-sidebar.component.html',
  styleUrl: './chat-right-sidebar.component.scss',
})
export class ChatRightSidebarComponent implements OnInit {
  // friends: any[] = [];
  users: IUser[] = [];

  isCollapsed$ = computed(() => this.sidebarService.isCollapsedRight$());

  constructor(
    private sidebarService: SidebarService,
    private keycloak: KeycloakService,
    private chatService: ChatService
  ) {}

  friendsService = inject(FriendsService);
  invitations = this.friendsService.invitations;
  friends = this.friendsService.friends;

  ngOnInit(): void {
    // this.chatService.getAllClients().subscribe((data) => {
    //   console.log('All clients:', data);
    //   this.users = data as IUser[];
    // });

    this.getInvitations();
    this.getFriends();

    // this.friendsService.getReceivedInvitations().subscribe(
    //   (data) => {
    //     console.log('Received invitations:', data);
    //     this.invitations = data as IINvMessage[];
    //     console.log('Invitations:', this.invitations);
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );

    // this.friendsService.getSendedInvitations().subscribe(
    //   (data) => {
    //     console.log('Sended invitations:', data);
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }

  getInvitations(): void {
    this.friendsService.getReceivedInvitations();
    this.friendsService.getSendedInvitations();
  }

  getFriends(): void {
    this.friendsService.getFriends();
  }

  toggleSidebar(): void {
    this.sidebarService.setCollapsedRight(!this.isCollapsed$());
  }

  // users: IUser[] = [
  //   {
  //     id: '0',
  //     firstName: 'Jan',
  //     lastName: 'Kowalski',
  //     email: 'test',
  //     lastSeen: '',
  //     online: true,
  //   },

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
  // ];
}
