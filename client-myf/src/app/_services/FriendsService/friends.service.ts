import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { endpoints } from '../../_enums/endpoints.enum';

interface IInvitation {
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(private http: HttpClient) {}

  sendInvitation(email: string) {
    console.log('Invitation sent to:', email);

    const body: IInvitation = {
      email: email,
    };

    return this.http.post(
      `${environment.API_URL}/${endpoints.inviteFriend}`,
      body
    );
  }
}
