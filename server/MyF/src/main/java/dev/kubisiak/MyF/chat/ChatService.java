package dev.kubisiak.MyF.chat;


import dev.kubisiak.MyF.notification.NotificationService;
import dev.kubisiak.MyF.user.User;
import dev.kubisiak.MyF.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMapper chatMapper;
    private final NotificationService notificationService;


    public ChatResponse createPrivateChat(String receiverId, Authentication authentication) {


        User authUser = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User with id: " + authentication.getName() + " not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("User with id: " + receiverId + " not found"));

        //Check if chat already exists
        String chatId = checkIfChatExists(authUser, receiver);
        if (chatId != null) {
            return ChatResponse.builder()
                    .id(chatId)
                    .name(receiver.getFirstName() + " " + receiver.getLastName())
                    .type(ChatType.PRIVATE)
                    .build();
        }

        Chat chat = new Chat();
        chat.setUsers(List.of(authUser, receiver));


        Chat chatFromRepository = chatRepository.save(chat);

        notificationService.sendNotificationThatChatWasCreated(authUser,receiver);

        return chatMapper.mapToChatResponse(chatFromRepository, authUser);
    }

    private String checkIfChatExists(User authUser, User receiver) {
        List<Chat> chats = chatRepository.findAllByUsers(authUser);
        for (Chat chat : chats) {
            if (chat.getUsers().contains(receiver)) {
                return chat.getId();
            }
        }
        return null;
    }

    public List<ChatResponse> getChatsByUserId(Authentication authentication) {


        User user = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User with id: " + authentication.getName() + " not found"));
        return chatRepository.findAllByUsers(user)
                .stream()
                .map(chat -> chatMapper.mapToChatResponse(chat, user))
                .toList();

    }

}
