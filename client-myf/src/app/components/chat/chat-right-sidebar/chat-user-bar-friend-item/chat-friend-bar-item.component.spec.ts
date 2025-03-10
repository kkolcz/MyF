import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFriendBarItemComponent } from './chat-friend-bar-item.component';

describe('ChatUserBarItemComponent', () => {
  let component: ChatFriendBarItemComponent;
  let fixture: ComponentFixture<ChatFriendBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFriendBarItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatFriendBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
