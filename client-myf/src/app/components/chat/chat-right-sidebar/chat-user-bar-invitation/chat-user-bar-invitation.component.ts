import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../../_services/FriendsService/friends.service';
import { ChatFriendsBarItemComponent } from '../chat-user-bar-friend-item/chat-friends-bar-item.component';
import { ChatUserBarInvitationItemComponent } from './chat-user-bar-invitation-item/chat-user-bar-invitation-item.component';

@Component({
  selector: 'app-chat-user-bar-invitation',
  standalone: true,
  imports: [
    FormsModule,
    ChatFriendsBarItemComponent,
    ChatUserBarInvitationItemComponent,
  ],
  templateUrl: './chat-user-bar-invitation.component.html',
  styleUrl: './chat-user-bar-invitation.component.scss',
})
export class ChatUserBarInvitationComponent implements OnInit {
  friendsService = inject(FriendsService);
  invitations = this.friendsService.invitations;
  inviteUserInput: string = '';
  foundedUsers: any[] = [];

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations(): void {
    this.friendsService.getReceivedInvitations();
    this.friendsService.getSendedInvitations();
  }

  addUserFriend(): void {
    // this.friendsService.sendInvitationById(this.inviteUserInput);
    this.searchUserHandler();
  }

  searchUserHandler(): void {
    this.friendsService.searchFriends('test').subscribe((data) => {
      console.log('Founded users:', data);
      this.foundedUsers = data as any[];
    });
  }
}
