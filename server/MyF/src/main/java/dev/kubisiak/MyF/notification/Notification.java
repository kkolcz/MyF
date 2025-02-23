package dev.kubisiak.MyF.notification;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {

    private String content;
    private NotificationType type;

}
