import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './account-forgot-password.component.html',
  styleUrl: './account-forgot-password.component.scss',
})
export class AccountForgotPasswordComponent {
  constructor(private router: Router) {}
  handleResetPassword() {
    this.router.navigate(['/account/login']);
    alert('Password reset link sent to your email.');
  }
}
