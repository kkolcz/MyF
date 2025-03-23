import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endpoints } from '../../_enums/endpoints.enum';
import {
  IFriendDto,
  IFriendInv,
  IFriendInvDto,
  IFriendSearchDto,
} from '../../_models/DTOs/friend-inv.model';
import { tap } from 'rxjs';
import { IUser } from '../../_models/user.model';
import { ApiService } from '../ApiService/api.service';
import { IPaginationParams } from '../../_models/paginationParams.model';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  invitations = signal<IFriendInv[]>([]);
  friends = signal<IUser[]>([]);

  apiService = inject(ApiService);

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

  getReceivedInvitations(): void {
    this.apiService
      .httpGet<IFriendInvDto>(`/${endpoints.receivedInvitations}`)
      .pipe(
        tap((res) => {
          this.invitations.set(res.data.invitations);
        })
      )
      .subscribe();
  }

  // getConversations() {
  //   this.chatService.getAllChats().subscribe((res) => {
  //     console.log('Conversations:', res.data.chats);
  //     this.chatService.conversations.set(res.data.chats);
  //   });
  // }

  wsRecrivedNewInvitation(data: IFriendInvDto) {
    // this.invitations.update((invitations) => [...invitations, data]);
  }

  getFriends() {
    return this.apiService
      .httpGet<IFriendDto>(`/${endpoints.getFriends}`)
      .subscribe({
        next: (res) => {
          console.log('Friends:', res);
          this.friends.set(res.data.users);
        },
        error: (err) => {
          console.log('Error:', err);
        },
      });
  }

  searchFriends(name: string) {
    const pagination: IPaginationParams = {
      page: '1',
      pageSize: '10',
      filter: name,
    };

    console.log(name);
    return this.apiService
      .httpGetPaginated<IFriendSearchDto>(
        `/${endpoints.searchFriends}`,
        pagination
      )
      .pipe(
        tap((res) => {
          console.log('Founded users:', res.data.users);
        })
      );
  }
}
