import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserBarInvitationItemComponent } from './chat-user-bar-invitation-item.component';

describe('ChatUserBarItemComponent', () => {
  let component: ChatUserBarInvitationItemComponent;
  let fixture: ComponentFixture<ChatUserBarInvitationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserBarInvitationItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatUserBarInvitationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
