import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ACCOUNT_ROUTES } from './components/account/account.routes';

export const routes: Routes = [
  ...ACCOUNT_ROUTES,
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
];
