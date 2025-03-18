package dev.kubisiak.MyF.chat;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
    private List<String> users;
}
