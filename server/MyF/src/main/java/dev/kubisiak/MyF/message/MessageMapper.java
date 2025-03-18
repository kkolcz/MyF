package dev.kubisiak.MyF.message;

public class MessageMapper {

    public static ResponseMessage mapToResponseMessage(Message message) {

        return ResponseMessage.builder()
                .id(message.getId())
                .content(message.getContent())
                .senderId(message.getSenderId())
                .chatId(message.getChat().getId())
                .type(message.getType())
                .build();
    }
}
