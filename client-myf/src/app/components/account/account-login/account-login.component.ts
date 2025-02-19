import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-login.component.html',
  styleUrl: './account-login.component.scss',
})
export class AccountLoginComponent {
  constructor(private router: Router) {}

  handleLogin() {
    this.router.navigate(['/chat']);
  }
}
