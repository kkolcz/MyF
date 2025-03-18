import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';
import { IToolbarUser, IUser } from '../../_models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: IToolbarUser = {
    fullNamed: '',
    isOnline: false,
    avatarUrl: '',
  };

  constructor(private keycloak: KeycloakService) {}
  ngOnInit(): void {
    this.user.fullNamed = this.keycloak.fullNamed;
    this.user.isOnline = true;
    this.user.avatarUrl = '';
  }

  onLeftClick() {
    console.log('Left click on user:', this.user.fullNamed);
    this.keycloak.logout();
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on user:', this.user.fullNamed);
  }

  getInitials(nickname: string): string {
    const initials = nickname
      .split(' ')
      .map((name) => name[0])
      .join('');
    return initials.substring(0, 2).toUpperCase();
  }
}
