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

            Notification senderNotificaiton = Notification.builder()
                        .content("You have been added to a new chat with " + receiver.getFirstName() + " " + receiver.getLastName())
                        .type(NotificationType.ADD_CHAT)
                        .build();
            simpMessagingTemplate.convertAndSendToUser(sender.getId(),"/notification",senderNotificaiton);


                Notification.builder()
                        .content("You have been added to a new chat with " + sender.getFirstName() + " " + sender.getLastName())
                        .type(NotificationType.ADD_CHAT)
                        .build();
            simpMessagingTemplate.convertAndSendToUser(receiver.getId(),"/notification",senderNotificaiton);
    }
}
