package dev.kubisiak.MyF.message;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.chat.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;



    public MessageResponse saveMessage(MessageRequest messageRequest, Authentication authentication) {

        Chat chat = chatRepository.findById(messageRequest.getChatId())
                .orElseThrow(() -> new RuntimeException("Chat not found"));


        Message message = new Message();
        message.setContent(messageRequest.getContent());
        message.setState(MessageState.SENT);
        message.setChat(chat);
        message.setSenderId(message.getSenderId());
        message.setReceiverId(authentication.getName());


        Message messageFromRepository = messageRepository.save(message);

        return MessageMapper.mapToMessageResponse(messageFromRepository);


    }
}
