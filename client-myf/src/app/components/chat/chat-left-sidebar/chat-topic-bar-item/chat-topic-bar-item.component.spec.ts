import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTopicBarItemComponent } from './chat-topic-bar-item.component';

describe('ChatTopicBarItemComponent', () => {
  let component: ChatTopicBarItemComponent;
  let fixture: ComponentFixture<ChatTopicBarItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTopicBarItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTopicBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
