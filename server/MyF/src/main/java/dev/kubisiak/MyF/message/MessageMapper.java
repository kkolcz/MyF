package dev.kubisiak.MyF.message;

public class MessageMapper {
    public static MessageResponse mapToMessageResponse(Message message) {

        return MessageResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .state(message.getState())
                .senderId(message.getSenderId())
                .receiverId(message.getReceiverId())
                .createdAt(message.getCreatedDate())
                .build();
    }
}
