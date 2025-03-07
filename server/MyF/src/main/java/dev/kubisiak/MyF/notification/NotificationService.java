package dev.kubisiak.MyF.notification;

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

    public void sendNotification(String userId, Notification notification){
        log.info("Sending WS notification to {} with payload {}",userId,notification);
        simpMessagingTemplate.convertAndSendToUser(userId,"/notification",notification);
    }


    public void sendNotificationThatChatWasCreated(User sender, User receiver){

            Notification receiverNotification = Notification.builder()
                        .content("You have been added to a new chat with " + receiver.getFirstName() + " " + receiver.getLastName())
                        .type(NotificationType.ADD_CHAT)
                        .build();
            simpMessagingTemplate.convertAndSendToUser(receiver.getId(),"/notification",receiverNotification);


            Notification senderNotification = Notification.builder()
                        .content("You have been added to a new chat with " + sender.getFirstName() + " " + sender.getLastName())
                        .type(NotificationType.ADD_CHAT)
                        .build();
            simpMessagingTemplate.convertAndSendToUser(sender.getId(),"/notification",senderNotification);
    }

    public void sendNotificationThatUserSentInvitation(User sender, User receiver){

        Notification receiverNotification = Notification.builder()
                .content("You have been invited to a chat by " + sender.getFirstName() + " " + sender.getLastName())
                .type(NotificationType.RECEIVED_INVITATION)
                .build();
        simpMessagingTemplate.convertAndSendToUser(receiver.getId(),"/notification",receiverNotification);

        Notification senderNotification = Notification.builder()
                .content("You have invited " + sender.getFirstName() + " " + sender.getLastName() + " to a chat")
                .type(NotificationType.SENT_INVITATION)
                .build();

        simpMessagingTemplate.convertAndSendToUser(sender.getId(),"/notification",receiverNotification);

    }

    public void sentNotificationThatUserAcceptedInvitation(User sender, User receiver){
        Notification receiverNotification = Notification.builder()
                .content("You have accepted an invitation to a chat with " + sender.getFirstName() + " " + sender.getLastName())
                .type(NotificationType.ACCEPTED_INVITATION)
                .build();
        simpMessagingTemplate.convertAndSendToUser(receiver.getId(),"/notification",receiverNotification);

        Notification senderNotification = Notification.builder()
                .content(receiver.getFirstName() + " " + receiver.getLastName() + " has accepted your invitation to a chat")
                .type(NotificationType.ACCEPTED_INVITATION)
                .build();
        simpMessagingTemplate.convertAndSendToUser(sender.getId(),"/notification",senderNotification);
    }


}
