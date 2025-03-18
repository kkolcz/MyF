package dev.kubisiak.MyF.chat;

import dev.kubisiak.MyF.common.BaseAuditingEntity;
import dev.kubisiak.MyF.message.Message;
import dev.kubisiak.MyF.user.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chat extends BaseAuditingEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;


    @ManyToMany
    @JoinTable(
            name = "chat_user",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;


    @OneToMany(mappedBy = "chat", fetch = FetchType.EAGER)
    @OrderBy("createdDate DESC")
    private List<Message> messages;

    private ChatType type;


}
