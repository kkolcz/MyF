import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserBarFriendsComponent } from './chat-user-bar-friends.component';

describe('ChatUserBarFriendsComponent', () => {
  let component: ChatUserBarFriendsComponent;
  let fixture: ComponentFixture<ChatUserBarFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserBarFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserBarFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
