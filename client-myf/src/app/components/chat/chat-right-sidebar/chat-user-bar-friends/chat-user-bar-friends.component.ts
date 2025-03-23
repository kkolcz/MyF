import { Component, inject, OnInit } from '@angular/core';
import { ChatUserBarInvitationItemComponent } from '../chat-user-bar-invitation/chat-user-bar-invitation-item/chat-user-bar-invitation-item.component';
import { ChatFriendsBarItemComponent } from '../chat-user-bar-friend-item/chat-friends-bar-item.component';
import { FriendsService } from '../../../../_services/FriendsService/friends.service';

@Component({
  selector: 'app-chat-user-bar-friends',
  standalone: true,
  imports: [ChatFriendsBarItemComponent],
  templateUrl: './chat-user-bar-friends.component.html',
  styleUrl: './chat-user-bar-friends.component.scss',
})
export class ChatUserBarFriendsComponent implements OnInit {
  friendsService = inject(FriendsService);

  friends = this.friendsService.friends;

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this.friendsService.getFriends();
  }
}
