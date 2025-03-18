package dev.kubisiak.MyF.user;


import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class UserMapper {
    public User fromTokenAttributes(Map<String, Object> attributes) {
        User user = new User();

        if(attributes.containsKey("sub")) {
            user.setId(attributes.get("sub").toString());
        }

        if(attributes.containsKey("given_name")) {
            user.setFirstName(attributes.get("given_name").toString());
        } else if (attributes.containsKey("nickname")) {
            user.setFirstName(attributes.get("nickname").toString());
        }

        if(attributes.containsKey("family_name")) {
            user.setLastName(attributes.get("family_name").toString());
        }

        if(attributes.containsKey("email")) {
            user.setEmail(attributes.get("email").toString());
        }

        return user;

    }

    public static UserResponse toUserResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .build();
    }
}