export enum endpoints {
  // CHAT
  getChats = 'chat',
  createChat = 'chat/create/private',
  // FRIENDS
  searchFriends = 'user/strangers',
  inviteFriend = 'invitation/send',
  receivedInvitations = 'invitations/received',
  sendedInvitations = 'invitations/sent',
  getFriends = 'user/friends',
  updateInvitation = 'invitation',
}
