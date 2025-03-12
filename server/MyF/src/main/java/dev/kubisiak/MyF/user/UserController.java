package dev.kubisiak.MyF.user;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name ="User")
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<UserResponse>> getAllUsers(Authentication authentication){
        return ResponseEntity.ok(userService.getAllUsersExceptSelf(authentication));
    }

    @GetMapping("/user/strangers")
    public ResponseEntity<Map<String,Object>> getAllStrangers(
            Authentication authentication,
            @RequestParam("page") int page,
            @RequestParam("pageSize") int pageSize,
            @RequestParam(value = "name",defaultValue = "",required = false) String name

    ){
        return ResponseEntity.ok(userService.getAllStrangers(authentication,page,pageSize,name));
    }

    @GetMapping("/user/friends")
    public ResponseEntity<List<UserResponse>> getFriends(Authentication authentication){
        return ResponseEntity.ok(userService.getFriends(authentication));
    }
}
