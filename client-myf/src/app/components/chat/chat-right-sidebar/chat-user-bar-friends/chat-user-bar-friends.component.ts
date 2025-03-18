import { Component, inject, OnInit } from '@angular/core';
import { ChatUserBarInvitationItemComponent } from '../chat-user-bar-invitation/chat-user-bar-invitation-item/chat-user-bar-invitation-item.component';
import { ChatFriendsBarItemComponent } from '../chat-user-bar-friend-item/chat-friends-bar-item.component';
import { FriendsService } from '../../../../_services/FriendsService/friends.service';

@Component({
  selector: 'app-chat-user-bar-friends',
  standalone: true,
  imports: [ChatUserBarInvitationItemComponent, ChatFriendsBarItemComponent],
  templateUrl: './chat-user-bar-friends.component.html',
  styleUrl: './chat-user-bar-friends.component.scss',
})
export class ChatUserBarFriendsComponent implements OnInit {
  friendsService = inject(FriendsService);
  invitations = this.friendsService.invitations;
  friends = this.friendsService.friends;

  ngOnInit(): void {
    this.getInvitations();
    this.getFriends();
  }

  getInvitations(): void {
    this.friendsService.getReceivedInvitations();
    this.friendsService.getSendedInvitations();
  }

  getFriends(): void {
    this.friendsService.getFriends();
  }
}
