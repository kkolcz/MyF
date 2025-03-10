package dev.kubisiak.MyF.user;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;


    public List<UserResponse> getAllUsersExceptSelf(Authentication loggedUser){

        return userRepository.findAllUsersExceptMyself(loggedUser.getName())
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();

    }


    public List<UserResponse> getFriends(Authentication authentication) {


        User user = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        log.info("Users: {}", user.getFriends());

        return user.getFriends()
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();

    }
}
