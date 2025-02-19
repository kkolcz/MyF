import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-user-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-user-bar-item.component.html',
  styleUrl: './chat-user-bar-item.component.scss',
})
export class ChatUserBarItemComponent {
  @Input() user!: { nickname: string; isOnline: boolean; lastSeen: Date };

  onLeftClick() {
    console.log('Left click on user:', this.user.nickname);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on user:', this.user.nickname);
  }
}
