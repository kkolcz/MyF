package dev.kubisiak.MyF.message;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageRequest {

    private String content;
    private String receiverId;
    private String chatId;
}
