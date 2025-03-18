import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';

import { Client } from '@stomp/stompjs';
import { FriendsService } from '../FriendsService/friends.service';
import { IInvitation } from '../../_models/invitation.model';

export type ListenerCallBack = (message: any) => void;

export interface ISendNewMessage {
  chatId: string;
  content: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnInit, OnDestroy {
  private socketClient!: Client;
  private messageSubscription: StompSubscription | undefined;
  private notificationSubscription: StompSubscription | undefined;
  private messageHandler: ListenerCallBack | undefined;
  private notificationHandler: ListenerCallBack | undefined;

  constructor(private keycloakService: KeycloakService) {}

  friendsService = inject(FriendsService);

  messages = signal<ISendNewMessage[]>([]);

  WS_ENDPOINT = 'ws://localhost:8080/ws';

  ngOnInit(): void {}

  registerMessageHandler(handler: ListenerCallBack) {
    this.messageHandler = handler;
  }

  registerNotificationHandler(handler: ListenerCallBack) {
    this.notificationHandler = handler;
  }

  initWebSocket() {
    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      const ws_messages = `/users/${this.keycloakService.keycloak.tokenParsed.sub}/messages`;
      const ws_notifications = `/users/${this.keycloakService.keycloak.tokenParsed.sub}/notification`;

      this.socketClient = new Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          Authorization: 'Bearer ' + this.keycloakService.keycloak.token,
        },
        debug: (msg: string) => {
          console.log(msg);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      this.socketClient.onConnect = (frame) => {
        this.messageSubscription = this.socketClient.subscribe(
          ws_messages,
          (message: any) => {
            const parsedMessage: Notification = JSON.parse(message.body);
            if (this.messageHandler) {
              console.log('WS: Message:', parsedMessage);
              this.messageHandler(parsedMessage);
            }
          }
        );

        this.notificationSubscription = this.socketClient.subscribe(
          ws_notifications,
          (message: any) => {
            const parsedMessage = JSON.parse(message.body);
            console.log('WS: Notification:', parsedMessage);

            if (this.notificationHandler) {
              this.notificationHandler(parsedMessage);
            }

            if (
              parsedMessage.type === 'SENT_INVITATION' &&
              parsedMessage.payload
            ) {
              const invitation = parsedMessage.payload as IInvitation;

              this.friendsService.invitations.update((invitations) => [
                ...invitations,
                invitation,
              ]);
            }

            if (
              parsedMessage.type === 'ACCEPTED_INVITATION' &&
              parsedMessage.payload
            ) {
              const invitation = parsedMessage.payload as IInvitation;

              this.friendsService.invitations.update((invitations) =>
                invitations.filter((inv) => inv.id !== invitation.id)
              );

              const newFriend = invitation.sender;
              this.friendsService.friends.update((friends) => [
                ...friends,
                newFriend,
              ]);
            }
          }
        );
      };

      this.socketClient.onStompError = (frame) => {
        console.error('STOMP error:', frame);
      };

      this.socketClient.activate();
    }
  }

  sendMessage(message: ISendNewMessage) {
    console.log('Sending message:', message);
    this.socketClient.publish({
      destination: '/app/chat/sendMessage',
      body: JSON.stringify(message),
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
