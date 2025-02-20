import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '../../../_services/ChatService/chat.service';
import { KeycloakService } from '../../../_utils/keycloak/keycloak.service';
import { IUser } from '../../../_models/user.model';

@Component({
  selector: 'app-chat-user-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-user-bar-item.component.html',
  styleUrl: './chat-user-bar-item.component.scss',
})
export class ChatUserBarItemComponent {
  @Input() user!: IUser;

  constructor(
    private chatService: ChatService,
    private keycloak: KeycloakService
  ) {}

  onLeftClick() {
    console.log('Left click on user:', this.user.firstName);
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
