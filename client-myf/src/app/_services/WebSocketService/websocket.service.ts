import { Injectable, OnDestroy, OnInit, signal } from '@angular/core';
import { StompSubscription } from '@stomp/stompjs';
import { KeycloakService } from '../../_utils/keycloak/keycloak.service';

import { Client } from '@stomp/stompjs';

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
  private messageHandler: ListenerCallBack | undefined;
  private notificationHandler: ListenerCallBack | undefined;

  constructor(private keycloakService: KeycloakService) {}

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
      // const subUrl = `/users/${this.keycloakService.keycloak.tokenParsed.sub}/chat`;
      const subUrl = `/users/${this.keycloakService.keycloak.tokenParsed.sub}/messages`;
      const subUrl2 = `/users/${this.keycloakService.keycloak.tokenParsed.sub}/notification`;

      // console.log('Bearer token: ', this.keycloakService.keycloak.token);

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
          subUrl,
          (message: any) => {
            const parsedMessage: Notification = JSON.parse(message.body);
            if (this.messageHandler) {
              console.log('WS: Message:', parsedMessage);
              this.messageHandler(parsedMessage);
            }
          }
        );

        this.messageSubscription = this.socketClient.subscribe(
          subUrl2,
          (message: any) => {
            const parsedMessage: Notification = JSON.parse(message.body);
            if (this.notificationHandler) {
              console.log('WS: Notification:', parsedMessage);
              this.notificationHandler(parsedMessage);
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
  }
}
