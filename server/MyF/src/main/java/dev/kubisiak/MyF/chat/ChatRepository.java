package dev.kubisiak.MyF.chat;

import dev.kubisiak.MyF.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, String> {

    public List<Chat> findAllByUsers(User user);
}
