import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendsBarItemComponent } from './chat-friends-bar-item.component';

describe('ChatUserBarItemComponent', () => {
  let component: ChatFriendsBarItemComponent;
  let fixture: ComponentFixture<ChatFriendsBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFriendsBarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatFriendsBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
