package dev.kubisiak.MyF.user;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name ="User")
public class UserController {

    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers(Authentication authentication){
        return ResponseEntity.ok(userService.getAllUsersExceptSelf(authentication));
    }

    @GetMapping("/user/friends")
    public ResponseEntity<List<UserResponse>> getFriends(Authentication authentication){
        return ResponseEntity.ok(userService.getFriends(authentication));
    }
}
