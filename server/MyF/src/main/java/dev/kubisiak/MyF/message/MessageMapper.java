package dev.kubisiak.MyF.message;

public class MessageMapper {

    public static WSMessage mapToWSMessage(Message message) {

        return WSMessage.builder()
                .id(message.getId())
                .content(message.getContent())
                .senderId(message.getSenderId())
                .chatId(message.getChat().getId())
                .type(message.getType())
                .build();
    }
}
