import { inject, Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';

import { Client } from '@stomp/stompjs';
import { FriendsService } from '../FriendsService/friends.service';
import { IInvitation } from '../../_models/invitation.model';
import { INotificationMessage } from '../../_models/ws_notification.model';
import { ChatService } from '../ChatService/chat.service';

export type ListenerCallBack = (message: any) => void;

export interface ISendNewMessage {
  chatId: string;
  content: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private socketClient!: Client;
  private messageSubscription: StompSubscription | undefined;
  private notificationSubscription: StompSubscription | undefined;
  private messageHandler: ListenerCallBack | undefined;
  private notificationHandler: ListenerCallBack | undefined;

  constructor(private keycloakService: KeycloakService) {}

  friendsService = inject(FriendsService);
  chatService = inject(ChatService);

  messages = signal<ISendNewMessage[]>([]);

  WS_ENDPOINT = 'ws://localhost:8080/ws';

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

            switch (parsedMessage.type) {
              case 'SENT_INVITATION':
                this.handleNotificationNewInvitation(parsedMessage);
                break;
              case 'ACCEPTED_INVITATION':
                this.handleNotificationAcceptedInvitation(parsedMessage);
                break;
              case 'REJECTED_INVITATION':
                console.log('Received rejected invitation:', parsedMessage);
                break;
              case 'ADD_CHAT':
                this.handleNotificationAddChat(parsedMessage);
                break;
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

  handleNotificationNewInvitation(message: INotificationMessage) {
    if (message.type === 'SENT_INVITATION' && message.payload) {
      const invitation = message.payload as IInvitation;

      this.friendsService.invitations.update((invitations) => [
        ...invitations,
        invitation,
      ]);
    }
  }

  handleNotificationAcceptedInvitation(message: INotificationMessage) {
    if (message.type === 'ACCEPTED_INVITATION' && message.payload) {
      const invitation = message.payload as IInvitation;

      this.friendsService.invitations.update((invitations) =>
        invitations.filter((inv) => inv.id !== invitation.id)
      );

      const newFriend = invitation.sender;
      this.friendsService.friends.update((friends) => [...friends, newFriend]);
    }
  }
  handleNotificationRejectedInvitation(message: INotificationMessage) {
    console.log('Received rejected invitation:', message);
    // handle rejected invitation
  }

  handleNotificationAddChat(message: INotificationMessage) {
    if (message.type === 'ADD_CHAT' && message.payload) {
      const chat = message.payload;
      this.chatService.conversations.update((chats) => [...chats, chat]);
    }
  }

  handleSendMessage(message: ISendNewMessage) {
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
