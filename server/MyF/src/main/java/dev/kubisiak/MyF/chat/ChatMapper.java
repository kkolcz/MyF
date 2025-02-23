package dev.kubisiak.MyF.chat;


import dev.kubisiak.MyF.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
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
        if(chat.getMessages().isEmpty()) {
            return "";
        }
        return chat.getMessages().get(chat.getMessages().size()-1).getContent();
    }

    private LocalDateTime getLastMessageTime(Chat chat) {
        if(chat.getMessages().isEmpty()) {
            return null;
        }
        return chat.getMessages().get(chat.getMessages().size()-1).getCreatedDate();
    }

    private String getChatName(Chat chat, User authUser) {
        return chat.getUsers().stream()
                .filter(user -> !user.getId().equals(authUser.getId()))
                .findFirst()
                .map(user -> user.getFirstName() + " " + user.getLastName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
