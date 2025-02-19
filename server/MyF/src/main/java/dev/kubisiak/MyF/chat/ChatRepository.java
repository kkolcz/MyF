package dev.kubisiak.MyF.chat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, String> {

    @Query(name= ChatConstants.FIND_CHAT_BY_SENDER_ID)
    List<Chat> findChatsBySenderId(String senderId);

    @Query(name= ChatConstants.FIND_CHAT_BY_SENDER_ID_AND_RECIPIENT_ID)
    Optional<Chat> findChatBySenderIdAndReceiverId(String senderId, String recipientId);
}
