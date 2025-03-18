package dev.kubisiak.MyF.message;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageRequest {

    private String content;
    private String chatId;
    private MessageType type;
    private String senderId;
}
