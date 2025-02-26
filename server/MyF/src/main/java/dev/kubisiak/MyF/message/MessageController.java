package dev.kubisiak.MyF.message;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Message")
public class MessageController {

    private final MessageService messageService;


    @MessageMapping("/chat.sendMessage/{chatId}")
    public void sendMessage(@DestinationVariable String chatId,
                                       MessageRequest messageRequest,
                                       Authentication authentication) {
        messageService.saveMessage(messageRequest,authentication);
    }



}
