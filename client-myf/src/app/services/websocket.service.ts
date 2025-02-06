import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs';
// import { Task } from './task.model';

export type ListenerCallBack = (message: any) => void;

@Injectable({
  providedIn: 'root',
})
export class WebsocketService implements OnDestroy {
  private connection: CompatClient | undefined = undefined;

  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8080/ws');
    this.connection.connect({}, () => {});
  }

  connect() {}

  public send(task: any): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/dashboard/add_new_task', {}, JSON.stringify(task));
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe(
          '/tasks/added_task',
          (message) => fun(JSON.parse(message.body))
        );
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
