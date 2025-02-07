import { Injectable, OnDestroy, signal } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs';

export type ListenerCallBack = (message: any) => void;

export interface IMessage {
  sender: string;
  content: string;
  messageType: string;
}

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private connection: CompatClient | undefined = undefined;
  private subscription: StompSubscription | undefined;

  messages = signal<IMessage[]>([]);

  constructor() {}

  connect(username: string) {
    this.connection = Stomp.client('ws://localhost:8080/ws');
    this.connection.connect({}, () => {
      console.log('Connected to the server');
      this.connection!.send(
        '/app/chat.addUser',
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
      );
      this.subscribeTopic((message) => {
        // console.log('Received message:', message);
      });
    });
  }

  sendMessage(message: any) {
    if (this.connection && this.connection.connected) {
      this.connection.send(
        '/app/chat.sendMessage',
        {},
        JSON.stringify(message)
      );
    }
  }

  subscribeTopic(callback: ListenerCallBack) {
    if (this.connection && this.connection.connected) {
      this.subscription = this.connection.subscribe(
        '/topic/public',
        (message) => {
          const parsedMessage = JSON.parse(message.body);

          this.messages.update((messages) => [...messages, parsedMessage]);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
