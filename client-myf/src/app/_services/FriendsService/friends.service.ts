import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endpoints } from '../../_enums/endpoints.enum';
import { IFriendInvDto } from '../../_models/DTOs/friend-inv.model';
import { tap } from 'rxjs';
import { IUser } from '../../_models/user.model';
import { WebsocketService } from '../WebSocketService/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  invitations = signal<IFriendInvDto[]>([]);
  friends = signal<IUser[]>([]);

  constructor(private http: HttpClient) {}

  sendInvitationById(id: string) {
    const body = { invitedUserId: id };

    return this.http.post(
      `${environment.API_URL}/${endpoints.inviteFriend}`,
      body
    );
  }

  updateInvitation(id: string, status: string) {
    if (status === 'ACCEPTED' || status === 'REJECTED') {
      this.invitations.update((invitations) =>
        invitations.filter((invitation) => invitation.id !== id)
      );
    }
    return this.http
      .patch(
        `${environment.API_URL}/${endpoints.updateInvitation}/${id}?newInvitationStatus=${status}`,
        {}
      )
      .pipe(tap((res) => {}));
  }

  getSendedInvitations() {
    return this.http
      .get<IFriendInvDto[]>(
        `${environment.API_URL}/${endpoints.sendedInvitations}`
      )
      .subscribe({ next: (data) => {} });
  }

  getReceivedInvitations() {
    return this.http
      .get<IFriendInvDto[]>(
        `${environment.API_URL}/${endpoints.receivedInvitations}`
      )
      .subscribe({
        next: (data) => {
          this.invitations.set(data);
        },
      });
  }

  wsRecrivedNewInvitation(data: IFriendInvDto) {
    this.invitations.update((invitations) => [...invitations, data]);
  }

  getFriends() {
    return this.http
      .get<IUser[]>(`${environment.API_URL}/${endpoints.getFriends}`)
      .subscribe({
        next: (data) => {
          console.log('Friends:', data);
          this.friends.set(data);
        },
      });
  }

  searchFriends(name: string) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.searchFriends}`,
      {}
    );
  }
}
