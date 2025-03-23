package dev.kubisiak.MyF.user;


import dev.kubisiak.MyF.common.ErrorMessageInformation;
import dev.kubisiak.MyF.common.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name ="User")
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/user/strangers")
    public ResponseEntity<Response> getAllStrangers(
            Authentication authentication,
            @RequestParam("pageNumber") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam(value = "filter",defaultValue = "",required = false) String name

    ){

        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(userService.getAllStrangers(authentication,page,pageSize,name))
                            .message("Users fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to fetch users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch users")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch users"))
                            .build()
            );
        }
    }

    @GetMapping("/user/friends")
    public ResponseEntity<Response> getFriends(Authentication authentication){


        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("users", userService.getFriends(authentication)))
                            .message("Users fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        } catch (IllegalArgumentException illegalArgumentException) {
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message(illegalArgumentException.getMessage())
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .errors(Map.of(ErrorMessageInformation.AUTHENTICATED_USER_NOT_FOUND,"Authenticated user not found"))
                            .build()
            );
        } catch (Exception e) {
            log.error("Failed to fetch users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch users")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch users"))
                            .build()
            );
        }

    }
}
