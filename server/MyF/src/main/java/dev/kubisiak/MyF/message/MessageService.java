package dev.kubisiak.MyF.message;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.chat.ChatRepository;
import dev.kubisiak.MyF.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class MessageService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final NotificationService notificationService;

    @Transactional
    public void saveMessage(MessageRequest messageRequest) {


        Chat chat = chatRepository.findById(messageRequest.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat not found"));


        Message message = new Message();
        message.setContent(messageRequest.getContent());
        message.setState(MessageState.SENT);
        message.setChat(chat);
        message.setSenderId(messageRequest.getSenderId());
        message.setType(messageRequest.getType());


        Message messageFromRepository = messageRepository.save(message);

        ResponseMessage responseMessage = MessageMapper.mapToResponseMessage(messageFromRepository);


        chat.getUsers().stream().forEach((user) -> {
            log.info("Sending message to user {} with content {}", user.getId(), responseMessage.getContent());
            simpMessagingTemplate.convertAndSendToUser(user.getId(), "/messages", responseMessage);
        });


    }

    public List<ResponseMessage> findChatMessages(String chatId) {

        return messageRepository.findMessagesByChatId(chatId)
                .stream()
                .map(MessageMapper::mapToResponseMessage)
                .toList();

    }
}
