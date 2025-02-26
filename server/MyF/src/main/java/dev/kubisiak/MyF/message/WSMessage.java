package dev.kubisiak.MyF.message;


import dev.kubisiak.MyF.notification.NotificationType;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WSMessage {

    private Long id;
    private String content;
    private String senderId;
    private String chatId;
    private MessageState state;
    private MessageType type;

}
