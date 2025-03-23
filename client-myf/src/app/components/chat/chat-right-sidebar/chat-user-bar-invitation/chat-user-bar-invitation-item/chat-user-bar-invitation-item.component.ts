import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '../../../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../../../_utils/keycloak/keycloak.service';
import { IUser } from '../../../../../_models/user.model';
import { FriendsService } from '../../../../../_services/FriendsService/friends.service';
import { IFriendInvDto } from '../../../../../_models/DTOs/friend-inv.model';

@Component({
  selector: 'chat-user-bar-invitation-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-user-bar-invitation-item.component.html',
  styleUrl: './chat-user-bar-invitation-item.component.scss',
})
export class ChatUserBarInvitationItemComponent {
  @Input() invitation!: IFriendInvDto;
  // @Input() isInvitation: boolean = false;
  // @Input() isFounded: boolean = false;
  // @Input() isFriend: boolean = false;

  constructor(
    private chatService: ChatService,
    private keycloak: KeycloakService,
    private friendsService: FriendsService
  ) {
    console.log('User:', this.invitation);
  }

  onLeftClick() {
    console.log('Left click on user:', this.invitation);
  }

  acceptFriend(event: MouseEvent) {
    event.preventDefault();
    console.log('Accept friend:', this.invitation.id);
    this.friendsService
      .updateInvitation(this.invitation.id, 'ACCEPTED')
      .subscribe((data) => {
        console.log(data);
      });
  }

  rejectFriend(event: MouseEvent) {
    event.preventDefault();
    console.log('Reject friend:', this.invitation);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on user:', this.invitation);
  }
}
