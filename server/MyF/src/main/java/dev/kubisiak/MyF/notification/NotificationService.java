package dev.kubisiak.MyF.notification;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.chat.ChatMapper;
import dev.kubisiak.MyF.invitation.Invitation;
import dev.kubisiak.MyF.invitation.InvitationMapper;
import dev.kubisiak.MyF.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;
    private final InvitationMapper invitationMapper;
    private final ChatMapper chatMapper;

    public void sendNotification(String userId, Notification notification){
        log.info("Sending WS notification to {} with payload {}",userId,notification);
        simpMessagingTemplate.convertAndSendToUser(userId,"/notification",notification);
    }


    public void sendNotificationThatPrivateChatWasCreated(User chatReceiver,User chatCreator, Chat chat){

            Notification notification = Notification.builder()
                        .content("You have been added to a new chat with " + chatCreator.getFirstName() + " " + chatCreator.getLastName())
                        .type(NotificationType.ADD_CHAT)
                        .payload(chatMapper.mapToChatResponse(chat,chatCreator))
                        .build();
            simpMessagingTemplate.convertAndSendToUser(chatReceiver.getId(),"/notification",notification);
    }

    public void sendNotificationThatUserSentInvitation(User invitationReceiver, Invitation invitation){

        Notification notification = Notification.builder()
                .content("User " + invitation.getSender().getFirstName() + " " + invitation.getSender().getLastName() + " sent you an invitation")
                .type(NotificationType.SENT_INVITATION)
                .payload(invitationMapper.mapToInvitationResponse(invitation))
                .build();

        simpMessagingTemplate.convertAndSendToUser(invitationReceiver.getId(),"/notification",notification);

    }

    public void sentNotificationThatUserAcceptedInvitation(User invitationSender, Invitation invitation){


        Notification notification = Notification.builder()
                .content("User " + invitation.getRecipient().getFirstName() + " " + invitation.getRecipient().getLastName() + " accepted your invitation")
                .type(NotificationType.ACCEPTED_INVITATION)
                .payload(invitationMapper.mapToInvitationResponse(invitation))
                .build();
        simpMessagingTemplate.convertAndSendToUser(invitationSender.getId(),"/notification",notification);
    }


}
