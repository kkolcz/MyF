package dev.kubisiak.MyF.message;


import dev.kubisiak.MyF.common.ErrorMessageInformation;
import dev.kubisiak.MyF.common.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Message")
@Slf4j
public class MessageController {

    private final MessageService messageService;

    @MessageMapping("/chat/sendMessage")
    public void sendMessage(MessageRequest messageRequest) {
        messageService.saveMessage(messageRequest);
    }

    @GetMapping("/chat/{chatId}/messages")
    public ResponseEntity<Response> getChatMessages(@PathVariable("chatId") String chatId){
        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("messages", messageService.findChatMessages(chatId)))
                            .message("Messages fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to fetch chats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch messages")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch messages"))
                            .build()
            );
        }

    }



}
