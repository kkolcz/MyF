import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endpoints } from '../../_enums/endpoints.enum';
import { IUser } from '../../_models/user.model';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IINvMessage {
  id: string;
  sender: IUser;
  receiver: IUser;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ'; // Możesz dodać inne statusy, jeśli są potrzebne
}

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  sendInvitationById(id: string) {
    const body = { invitedUserId: id };

    return this.http.post(
      `${environment.API_URL}/${endpoints.inviteFriend}`,
      body
    );
  }

  updateInvitation(id: string, status: string) {
    return this.http.patch(
      `${environment.API_URL}/${endpoints.updateInvitation}/${id}?newInvitationStatus=${status}`,
      {}
    );
  }

  getSendedInvitations() {
    return this.http.get(
      `${environment.API_URL}/${endpoints.sendedInvitations}`
    );
  }

  getReceivedInvitations() {
    return this.http.get<IINvMessage[]>(
      `${environment.API_URL}/${endpoints.receivedInvitations}`
    );
  }

  getFriends() {
    return this.http.get(`${environment.API_URL}/${endpoints.getFriends}`);
  }

  searchFriends(name: string) {
    return this.http.get(
      `${environment.API_URL}/${endpoints.searchFriends}`,
      {}
    );
  }
}
