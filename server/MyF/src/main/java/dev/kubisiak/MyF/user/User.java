package dev.kubisiak.MyF.user;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.common.BaseAuditingEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
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

}
