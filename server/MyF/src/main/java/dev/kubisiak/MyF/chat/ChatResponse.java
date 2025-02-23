package dev.kubisiak.MyF.chat;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatResponse {

    private String id;
    private String name;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private ChatType type;
}
