package dev.kubisiak.MyF.chat;


import dev.kubisiak.MyF.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatMapper {
    public ChatResponse mapToChatResponse(Chat chat, User authUser) {

        return ChatResponse.builder()
                .id(chat.getId())
                .name(getChatName(chat, authUser))
                .lastMessage(getLastMessage(chat))
                .lastMessageTime(getLastMessageTime(chat))
                .type(chat.getType())
                .users(chat.getUsers()
                        .stream()
                        .filter(user -> !user.getId().equals(authUser.getId()))
                        .map(User::getId)
                        .toList())
                .build();
    }


    private String getLastMessage(Chat chat) {
        if(!chat.getMessages().isEmpty() && chat.getMessages() != null) {
            return chat.getMessages().getLast().getContent();
        }

        return null;

    }

    private LocalDateTime getLastMessageTime(Chat chat) {
        if(!chat.getMessages().isEmpty() && chat.getMessages() != null) {
            chat.getMessages().get(0).getCreatedDate();
        }


        return null;
    }

    private String getChatName(Chat chat, User authUser) {
        return chat.getUsers().stream()
                .filter(user -> !user.getId().equals(authUser.getId()))
                .findFirst()
                .map(user -> user.getFirstName() + " " + user.getLastName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
