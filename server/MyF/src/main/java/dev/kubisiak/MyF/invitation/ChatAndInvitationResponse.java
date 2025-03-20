package dev.kubisiak.MyF.invitation;


import dev.kubisiak.MyF.chat.ChatResponse;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatAndInvitationResponse {

    private ChatResponse chat;
    private InvitationResponse invitation;

}
