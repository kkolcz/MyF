import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserBarItemComponent } from './chat-user-bar-item.component';

describe('ChatUserBarItemComponent', () => {
  let component: ChatUserBarItemComponent;
  let fixture: ComponentFixture<ChatUserBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatUserBarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatUserBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
