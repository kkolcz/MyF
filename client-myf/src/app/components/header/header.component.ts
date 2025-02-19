import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user = {
    nickname: 'Jan Kowalski',
    isOnline: true,
    avatarUrl: '',
  };

  onLeftClick() {
    console.log('Left click on user:', this.user.nickname);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on user:', this.user.nickname);
  }

  getInitials(nickname: string): string {
    const initials = nickname
      .split(' ')
      .map((name) => name[0])
      .join('');
    return initials.substring(0, 2).toUpperCase();
  }
}
