package dev.kubisiak.MyF.invitation;


import dev.kubisiak.MyF.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, String> {



    @Query("SELECT i FROM Invitation i WHERE i.sender.id = :senderId")
    Optional<List<Invitation>> findInvitationsBySender(String senderId);


    Optional<Invitation> findInvitationBySenderAndRecipient(User sender, User invitedUser);

    @Query("SELECT i FROM Invitation i WHERE i.recipient.id = :recipientId")
    Optional <List<Invitation>> findInvitationsByRecipient(String recipientId);


}
