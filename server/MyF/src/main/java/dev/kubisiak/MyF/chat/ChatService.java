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




    public List<ChatResponse> getChatsByUserId(Authentication authentication) {


        User user = userRepository.findById(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User with id: " + authentication.getName() + " not found"));
        return chatRepository.findAllByUsers(user)
                .stream()
                .map(chat -> chatMapper.mapToChatResponse(chat, user))
                .toList();

    }

}
