package dev.kubisiak.MyF.chat;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/chat/create/private")
    public ResponseEntity<ChatResponse> joinChat(@RequestParam(name = "receiver-id") String receiverId, Authentication authentication) {
        ChatResponse chatResponse = chatService.createPrivateChat(receiverId, authentication);

        return ResponseEntity.ok(chatResponse);
    }

    @GetMapping("/chats")
    public ResponseEntity<List<ChatResponse>> getChatsByUser(Authentication authentication){
        return ResponseEntity.ok(chatService.getChatsByUserId(authentication));
    }

}
