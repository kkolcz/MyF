import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '../../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../../_utils/keycloak/keycloak.service';
import { IUser } from '../../../../_models/user.model';
import { FriendsService } from '../../../../_services/FriendsService/friends.service';

@Component({
  selector: 'app-friends-user-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-friends-bar-item.component.html',
  styleUrl: './chat-friends-bar-item.component.scss',
})
export class ChatFriendsBarItemComponent {
  @Input() user!: IUser;
  @Input() isInvitation: boolean = false;
  @Input() isFounded: boolean = false;
  @Input() isFriend: boolean = false;

  constructor(
    private chatService: ChatService,
    private keycloak: KeycloakService,
    private friendsService: FriendsService
  ) {
    console.log('User:', this.user);
  }

  onLeftClick() {
    console.log('Left click on user:', this.user.firstName);
  }

  addFriend(event: MouseEvent) {
    event.preventDefault();
    console.log('Add friend:', this.user.id);
    this.friendsService.sendInvitationById(this.user.id).subscribe((data) => {
      console.log('Send invitation:', data);
    });
  }

  acceptFriend(event: MouseEvent) {
    event.preventDefault();
    console.log('Accept friend:', this.user.id);
    this.friendsService
      .updateInvitation(this.user.id, 'ACCEPTED')
      .subscribe((data) => {
        console.log(data);
      });
  }

  rejectFriend(event: MouseEvent) {
    event.preventDefault();
    console.log('Reject friend:', this.user.id);
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
