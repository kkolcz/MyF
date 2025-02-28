import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserBarInvitationComponent } from './chat-user-bar-invitation.component';

describe('ChatUserBarInvitationComponent', () => {
  let component: ChatUserBarInvitationComponent;
  let fixture: ComponentFixture<ChatUserBarInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserBarInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserBarInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
