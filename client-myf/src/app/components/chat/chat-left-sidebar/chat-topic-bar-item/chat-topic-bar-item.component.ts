import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ChatService } from '../../../../_services/ChatService/chat.service';
import { IConversation } from '../../../../_models/DTOs/conversation.model';

@Component({
  selector: 'app-chat-topic-bar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-topic-bar-item.component.html',
  styleUrl: './chat-topic-bar-item.component.scss',
})
export class ChatTopicBarItemComponent {
  @Input() conversation!: IConversation;

  constructor(private chatService: ChatService) {}

  onLeftClick() {
    console.log('Left click on conversation:', this.conversation.id);
    this.chatService.setCurrentChat(this.conversation);
    this.chatService.setCurrentReceiver(this.conversation);
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    console.log('Right click on conversation:', this.conversation.name);
  }
}
