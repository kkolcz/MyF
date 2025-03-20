package dev.kubisiak.MyF.invitation;


import dev.kubisiak.MyF.chat.ChatResponse;
import dev.kubisiak.MyF.user.UserResponse;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvitationResponse {

    private String id;
    private UserResponse sender;
    private UserResponse receiver;
    private InvitationStatus status;

}
