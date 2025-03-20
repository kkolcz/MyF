package dev.kubisiak.MyF.invitation;


import dev.kubisiak.MyF.user.UserResponse;
import org.springframework.stereotype.Service;

@Service
public class InvitationMapper {




    public InvitationResponse mapToInvitationResponse(Invitation invitation) {

        return InvitationResponse.builder()
                .id(invitation.getId())
                .sender(UserResponse.builder()
                        .id(invitation.getSender().getId())
                        .firstName(invitation.getSender().getFirstName())
                        .lastName(invitation.getSender().getLastName())
                        .email(invitation.getSender().getEmail())
                        .build())
                .receiver(UserResponse.builder()
                        .id(invitation.getRecipient().getId())
                        .firstName(invitation.getRecipient().getFirstName())
                        .lastName(invitation.getRecipient().getLastName())
                        .email(invitation.getRecipient().getEmail())
                        .build())
                .status(invitation.getStatus())
                .build();

    }
}
