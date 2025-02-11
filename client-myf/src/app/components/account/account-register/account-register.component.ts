import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './account-register.component.html',
  styleUrl: './account-register.component.scss',
})
export class AccountRegisterComponent {
  constructor(private router: Router) {}

  handleRegister() {
    this.router.navigate(['/account/login']);
    alert('Account created successfully.');
  }
}
