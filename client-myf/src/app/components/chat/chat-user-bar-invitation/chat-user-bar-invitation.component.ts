import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendsService } from '../../../_services/FriendsService/friends.service';

@Component({
  selector: 'app-chat-user-bar-invitation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-user-bar-invitation.component.html',
  styleUrl: './chat-user-bar-invitation.component.scss',
})
export class ChatUserBarInvitationComponent {
  constructor(private friendsService: FriendsService) {}
  inviteUserInput: string = '';

  addUserFriend(): void {
    this.friendsService.sendInvitation(this.inviteUserInput);
  }
}
