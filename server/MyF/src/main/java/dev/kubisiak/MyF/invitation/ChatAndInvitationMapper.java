package dev.kubisiak.MyF.invitation;

import dev.kubisiak.MyF.chat.Chat;
import dev.kubisiak.MyF.chat.ChatMapper;
import dev.kubisiak.MyF.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatAndInvitationMapper {

    private final ChatMapper chatMapper;
    private final InvitationMapper invitationMapper;

    public ChatAndInvitationResponse mapToChatAndInvitationResponse(Invitation invitation, Chat chat, User authUser) {

        return ChatAndInvitationResponse.builder()
                .chat(chat==null?null:chatMapper.mapToChatResponse(chat, authUser))
                .invitation(invitationMapper.mapToInvitationResponse(invitation))
                .build();

    }


}
