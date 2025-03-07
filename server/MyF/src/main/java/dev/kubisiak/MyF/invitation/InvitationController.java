package dev.kubisiak.MyF.invitation;


import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Invitation")
@Slf4j
public class InvitationController {

    private final InvitationService invitationService;


    @PostMapping("/invitation/send")
    public ResponseEntity<InvitationResponse> sendInvitation(@RequestBody InvitationRequest invitationRequest, Authentication authentication){


        try {
            return ResponseEntity.ok(invitationService.sendInvitation(invitationRequest, authentication));
        }  catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/invitations/sent")
    public ResponseEntity<List<InvitationResponse>> getSentInvitations(Authentication authentication){
        return ResponseEntity.ok(invitationService.getSentInvitations(authentication));
    }


    @GetMapping("/invitations/received")
    public ResponseEntity<List<InvitationResponse>> getReceivedInvitations(Authentication authentication){
        return ResponseEntity.ok(invitationService.getReceivedInvitations(authentication));
    }

    @PatchMapping("/invitation/{invitationId}")
    public ResponseEntity<InvitationResponse> acceptOrRejectInvitation(@RequestParam("newInvitationStatus") InvitationStatus invitationStatus, Authentication authentication, @PathVariable String invitationId){
        return ResponseEntity.ok(invitationService.acceptOrRejectInvitation(invitationStatus, authentication, invitationId));

    }

}
