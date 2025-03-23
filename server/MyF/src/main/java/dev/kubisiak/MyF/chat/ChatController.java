package dev.kubisiak.MyF.chat;


import dev.kubisiak.MyF.common.ErrorMessageInformation;
import dev.kubisiak.MyF.common.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Chat")
@Slf4j
public class ChatController {

    private final ChatService chatService;


    @GetMapping("/chats")
    public ResponseEntity<Response> getChatsByUser(Authentication authentication){

        try {
           return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("chats", chatService.getChatsByUserId(authentication)))
                            .message("Chats fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to fetch chats", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch chats")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch chats"))
                            .build()
            );
        }

    }

}
