import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { IUser } from '../../../_models/user.model';
import { FriendsService } from '../../../_services/FriendsService/friends.service';

@Component({
  selector: 'app-friend-user-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-friend-bar-item.component.html',
  styleUrl: './chat-friend-bar-item.component.scss',
})
export class ChatFriendBarItemComponent {
  @Input() user!: IUser;

  constructor(
    private chatService: ChatService,
    private keycloak: KeycloakService,
    private friendsService: FriendsService
  ) {}

  onLeftClick() {
    console.log('Left click on user:', this.user.firstName);
  }

  addFriend() {
    console.log('Add friend:', this.user.id);
    this.friendsService.sendInvitationById(this.user.id).subscribe((data) => {
      console.log('Send invitation:', data);
    });
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on user:', this.user.firstName);

    this.chatService
      .newChat(this.keycloak.userId, this.user.id)
      .subscribe((data) => {
        console.log('New chat:', data);
      });
  }
}
