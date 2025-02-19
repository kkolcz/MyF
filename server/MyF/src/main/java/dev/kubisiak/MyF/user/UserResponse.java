package dev.kubisiak.MyF.user;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String id;
    private String firstName;
    private String lastname;
    private String email;
    private LocalDateTime lastSeen;
    private boolean isOnline;
}
