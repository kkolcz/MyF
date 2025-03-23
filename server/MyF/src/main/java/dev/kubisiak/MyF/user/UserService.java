package dev.kubisiak.MyF.user;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;



    public List<UserResponse> getFriends(Authentication authentication) {
        User user = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        log.info("Users: {}", user.getFriends());
        return user.getFriends()
                .stream()
                .map(UserMapper::toUserResponse)
                .toList();

    }


    public Map<String, Object> getAllStrangers(Authentication authentication, int page, int pageSize, String name) {
        if(page>0){
            page = page - 1;
        }
        Sort sort = Sort.by(Sort.Order.asc("firstName"), Sort.Order.asc("lastName")).ascending();
        Pageable pageable = PageRequest.of(page, pageSize, sort);
        Page<User> users = userRepository.findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseExcludingFriends(authentication.getName(), name , pageable);
        return buildResponseMap(users);
    }

    private Map<String, Object> buildResponseMap(Page<User> page) {
        Map<String, Object> response = new LinkedHashMap<>();
        Map<String, Object> paging = new LinkedHashMap<>();
        paging.put("totalAmountOfPages", page.getTotalPages());
        paging.put("totalAmountOfItems", page.getTotalElements());
        response.put("pagination", paging);
        response.put("users", page.getContent().stream().map(UserMapper::toUserResponse).toList());
        return response;
    }


}
