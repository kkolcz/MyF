package dev.kubisiak.MyF.message;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResponseMessage {

    private Long id;
    private String content;
    private String senderId;
    private String chatId;
    private MessageState state;
    private MessageType type;
    private LocalDateTime createdDate;

}
