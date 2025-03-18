package dev.kubisiak.MyF.user;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.common.BaseAuditingEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseAuditingEntity {


    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;

    @ManyToMany(mappedBy = "users")
    private List<Chat> chats;

    @ManyToMany
    @JoinTable(
            name = "user_friends",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "friend_id")
    )
    private List<User> friends;

}
