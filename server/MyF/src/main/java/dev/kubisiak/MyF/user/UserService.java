package dev.kubisiak.MyF.user;


import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public List<UserResponse> getAllUsersExceptSelf(Authentication loggedUser){

        return userRepository.findAllUsersExceptMyself(loggedUser.getName())
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();

    }


}
