import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../../_services/FriendsService/friends.service';
import { ChatFriendsBarItemComponent } from '../chat-user-bar-friend-item/chat-friends-bar-item.component';

@Component({
  selector: 'app-chat-user-bar-invitation',
  standalone: true,
  imports: [FormsModule, ChatFriendsBarItemComponent],
  templateUrl: './chat-user-bar-invitation.component.html',
  styleUrl: './chat-user-bar-invitation.component.scss',
})
export class ChatUserBarInvitationComponent implements OnInit {
  constructor(private friendsService: FriendsService) {}
  inviteUserInput: string = '';
  foundedUsers: any[] = [];

  ngOnInit(): void {}

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
