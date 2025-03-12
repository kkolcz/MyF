package dev.kubisiak.MyF.user;

import dev.kubisiak.MyF.chat.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String>, PagingAndSortingRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.id <> :userId")
    List<User> findAllUsersExceptMyself(String userId);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.id <> :userId " +
            "AND u.id NOT IN (SELECT f.id FROM User u JOIN u.friends f WHERE u.id = :userId) " +
            "AND u.firstName LIKE %:firstName% AND u.lastName LIKE %:lastName%")
    Page<User> findAllByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseExcludingFriends(String userId, String firstName, String lastName, Pageable pageable);
}
