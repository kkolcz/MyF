package dev.kubisiak.MyF.model;

import dev.kubisiak.MyF.enums.MessageType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatMessage {

    private String content;
    private String sender;
    private MessageType type;
}
