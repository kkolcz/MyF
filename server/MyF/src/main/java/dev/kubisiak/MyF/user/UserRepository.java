package dev.kubisiak.MyF.user;

import dev.kubisiak.MyF.chat.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.id <> :userId")
    public List<User> findAllUsersExceptMyself(String userId);

}
