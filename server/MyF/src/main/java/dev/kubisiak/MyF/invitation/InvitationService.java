package dev.kubisiak.MyF.invitation;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.chat.ChatRepository;
import dev.kubisiak.MyF.chat.ChatType;
import dev.kubisiak.MyF.notification.NotificationService;
import dev.kubisiak.MyF.user.User;
import dev.kubisiak.MyF.user.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class InvitationService {

    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;
    private final InvitationMapper invitationMapper;
    private final NotificationService notificationService;
    private final ChatRepository chatRepository;

    public InvitationResponse sendInvitation(InvitationRequest invitationRequest, Authentication authentication) throws Exception {

        //Find sender by email
        User sender = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new EntityNotFoundException("Sender with id " + authentication.getName() + " not found"));


        //Find receiver by email
        User invitedUser = userRepository.findById(invitationRequest.getInvitedUserId())
                .orElseThrow(() -> new EntityNotFoundException("Invited user with id " + invitationRequest.getInvitedUserId() + " not found"));

        //Check if invitation was already sent
        if (invitationRepository.findInvitationBySenderAndRecipient(sender, invitedUser).isPresent() || invitationRepository.findInvitationBySenderAndRecipient(invitedUser, sender).isPresent()) {
            throw new IllegalArgumentException("Invitation was already sent");
        }

        //Check if users are already friends
        checkIfUsersAreAlreadyFriends(sender, invitedUser);

        //Create invitation
        Invitation invitation = new Invitation();
        invitation.setSender(sender);
        invitation.setRecipient(invitedUser);
        invitation.setStatus(InvitationStatus.PENDING);

        invitationRepository.save(invitation);

        //Sent notification about invitation
        notificationService.sendNotificationThatUserSentInvitation(invitedUser, invitation);

        return invitationMapper.mapToInvitationResponse(invitation);

    }


    private void checkIfUsersAreAlreadyFriends(User sender, User invitedUser) throws Exception {
        if (sender.getFriends().contains(invitedUser) || invitedUser.getFriends().contains(sender)) {
            throw new EntityExistsException("Users are already friends");
        }
    }


    public List<InvitationResponse> getSentInvitations(Authentication authentication) {

       List<Invitation> sentInvitations = invitationRepository.findInvitationsBySender(authentication.getName());
        return sentInvitations.
                stream()
                .map(invitationMapper::mapToInvitationResponse)
                .toList();


    }

    public List<InvitationResponse> getReceivedInvitations(Authentication authentication) {

        List<Invitation> receivedInvitations = invitationRepository.findInvitationsByRecipient(authentication.getName());
        return receivedInvitations.
                stream()
                .map(invitationMapper::mapToInvitationResponse)
                .toList();
    }



    public Boolean acceptOrRejectInvitation(InvitationStatus invitationStatus, Authentication authentication, String invitationId) {


        Invitation invitation = invitationRepository.findById(invitationId)
                .orElseThrow(() -> new EntityNotFoundException("Invitation with id " + invitationId + " not found"));

        //Check if user is recipient of invitation
        if(!invitation.getRecipient().getId().equals(authentication.getName())){
            throw new IllegalArgumentException("User is not recipient of invitation");
        }


        if(invitationStatus.equals(InvitationStatus.REJECTED)){
            invitationRepository.delete(invitation);
            invitation.setStatus(InvitationStatus.REJECTED);
            return true;
        }

        if(invitationStatus.equals(InvitationStatus.ACCEPTED)){

            User sender = invitation.getSender();
            User recipient = invitation.getRecipient();

            sender.getFriends().add(recipient);
            recipient.getFriends().add(sender);

            userRepository.save(sender);
            userRepository.save(recipient);


            invitationRepository.delete(invitation);
            invitation.setStatus(InvitationStatus.ACCEPTED);

            createPrivateChat(recipient,sender);

            notificationService.sentNotificationThatUserAcceptedInvitation(sender, invitation);

            return true;


        }

        throw new IllegalArgumentException("Invitation status is not valid");
    }





    private void createPrivateChat(User userWhoAcceptInvitation, User userWhoSentInvitation) {



        //Check if chat already exists
        Chat chatFromRepository = checkIfChatExists(userWhoAcceptInvitation, userWhoSentInvitation);
        if (chatFromRepository != null) {
            return;
        }

        Chat chat = new Chat();
        chat.setType(ChatType.PRIVATE);
        chat.setMessages(List.of());
        chat.setUsers(List.of(userWhoAcceptInvitation, userWhoSentInvitation));

        Chat newCreatedChatFromRepository = chatRepository.save(chat);

        notificationService.sendNotificationThatPrivateChatWasCreated(userWhoSentInvitation,userWhoAcceptInvitation,newCreatedChatFromRepository);
    }

    private Chat checkIfChatExists(User authUser, User receiver) {
        List<Chat> chats = chatRepository.findAllByUsers(authUser);
        for (Chat chat : chats) {
            if (chat.getUsers().contains(receiver)) {
                return chat;
            }
        }
        return null;
    }

}
