package dev.kubisiak.MyF.invitation;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvitationRequest {

    private String invitedUserId;

}
