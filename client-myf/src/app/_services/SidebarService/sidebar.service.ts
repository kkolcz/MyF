import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isCollapsedLeft = signal<boolean>(false);
  private isCollapsedRight = signal<boolean>(false);

  get isCollapsedLeft$() {
    return this.isCollapsedLeft;
  }
  get isCollapsedRight$() {
    return this.isCollapsedRight;
  }

  setCollapsedLeft(value: boolean) {
    console.log('setCollapsedLeft', value);
    this.isCollapsedLeft.update(() => value);
  }

  setCollapsedRight(value: boolean) {
    console.log('setCollapsedRight', value);
    this.isCollapsedRight.update(() => value);
  }

  constructor() {}
}
