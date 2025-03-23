package dev.kubisiak.MyF.invitation;


import dev.kubisiak.MyF.common.ErrorMessageInformation;
import dev.kubisiak.MyF.common.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@Tag(name ="Invitation")
@Slf4j
public class InvitationController {

    private final InvitationService invitationService;


    @PostMapping("/invitation/send")
    public ResponseEntity<Response> sendInvitation(@RequestBody InvitationRequest invitationRequest, Authentication authentication){

        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("invitation", invitationService.sendInvitation(invitationRequest, authentication)))
                            .message("Invitation sent successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        }catch (EntityNotFoundException entityNotFoundException) {

            Map<ErrorMessageInformation, String> errors;
            if(entityNotFoundException.getMessage().contains("Sender")){
                errors = Map.of(ErrorMessageInformation.SENDER_NOT_FOUND, "Sender not found");
            }else {
                errors = Map.of(ErrorMessageInformation.INVITED_USER_NOT_FOUND, "Invited user not found");
            }


            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message(entityNotFoundException.getMessage())
                            .status(HttpStatus.NOT_FOUND)
                            .statusCode(HttpStatus.NOT_FOUND.value())
                            .errors(errors)
                            .build()
            );
        }catch (IllegalArgumentException illegalArgumentException){
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message(illegalArgumentException.getMessage())
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .errors(Map.of(ErrorMessageInformation.INVITATION_WAS_ALREADY_SENT, "Invitation was already sent"))
                            .build()
            );
        }catch (EntityExistsException entityExistsException){
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message(entityExistsException.getMessage())
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .errors(Map.of(ErrorMessageInformation.USER_ARE_ALREADY_FRIENDS, "Users are already friends"))
                            .build()
            );
        }catch (Exception exception){
            log.error("Failed to send invitation", exception);
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch chats")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch invitations"))
                            .build()
            );
        }

    }

    @GetMapping("/invitations/sent")
    public ResponseEntity<Response> getSentInvitations(Authentication authentication){


        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("invitations", invitationService.getSentInvitations(authentication)))
                            .message("Sent invitations fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        }catch (Exception exception){
            log.error("Failed to fetch sent invitations", exception);
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch invitations")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch sent invitations"))
                            .build()
            );
        }

    }


    @GetMapping("/invitations/received")
    public ResponseEntity<Response> getReceivedInvitations(Authentication authentication){

        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("invitations", invitationService.getReceivedInvitations(authentication)))
                            .message("Received invitations fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        }catch (Exception exception){
            log.error("Failed to fetch received invitations", exception);
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch invitations")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to fetch received invitations"))
                            .build()
            );
        }

    }

    @PatchMapping("/invitation/{invitationId}")
    public ResponseEntity<Response> acceptOrRejectInvitation(
            @RequestParam("newInvitationStatus") InvitationStatus invitationStatus,
            Authentication authentication,
            @PathVariable String invitationId){


        try {
            return ResponseEntity.ok(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .data(Map.of("invitation", invitationService.acceptOrRejectInvitation(invitationStatus, authentication, invitationId)))
                            .message("Received invitations fetched successfully")
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build()
            );
        }catch (IllegalArgumentException illegalArgumentException){

            Map<ErrorMessageInformation, String> errors;
            switch (illegalArgumentException.getMessage()){
                case "User is not recipient of invitation":
                    errors = Map.of(ErrorMessageInformation.USER_IS_NOT_RECIPIENT_OF_INVITATION, "User is not recipient of invitation");
                    break;
                case "Invitation status is not valid":
                    errors = Map.of(ErrorMessageInformation.INVITATION_STATUS_IS_NOT_VALID, "Invitation status is not valid");
                    break;
                default:
                    errors = Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR, "Failed to update invitation status");
                    break;
            }
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to fetch invitations")
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .errors(errors)
                            .build()
            );
        }catch (EntityNotFoundException entityNotFoundException){
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message(entityNotFoundException.getMessage())
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .errors(Map.of(ErrorMessageInformation.INVITATION_WAS_NOT_FOUND,"Invitation was not found"))
                            .build()
            );
        }catch (Exception exception){
            log.error("Failed to change invitation status", exception);
            return ResponseEntity.badRequest().body(
                    Response.builder()
                            .timeStamp(LocalDateTime.now())
                            .message("Failed to change invitation status")
                            .status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .errors(Map.of(ErrorMessageInformation.INTERNAL_SERVER_ERROR,"Failed to change invitation status"))
                            .build()
            );
        }

    }

}
