import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITopic } from '../../../_models/topic.model';

@Component({
  selector: 'app-chat-topic-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-topic-bar-item.component.html',
  styleUrl: './chat-topic-bar-item.component.scss',
})
export class ChatTopicBarItemComponent {
  @Input() conversation!: ITopic;

  onLeftClick() {
    console.log('Left click on conversation:', this.conversation.name);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on conversation:', this.conversation.name);
  }
}
