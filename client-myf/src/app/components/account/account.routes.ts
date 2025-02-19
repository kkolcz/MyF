import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountRegisterComponent } from './account-register/account-register.component';
import { AccountForgotPasswordComponent } from './account-forgot-password/account-forgot-password.component';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: 'account',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AccountLoginComponent },
      { path: 'register', component: AccountRegisterComponent },
      { path: 'forgot-password', component: AccountForgotPasswordComponent },
    ],
  },
];
