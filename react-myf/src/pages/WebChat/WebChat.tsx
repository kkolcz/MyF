import React from 'react'
import ConversationBar from '../../components/ConversationBar/ConversationBar'
import ChatWindow from '../../components/ChatWindow/ChatWindow'
import FriendsBar from '../../components/FriendsBar/FriendsBar'

import styles from './WebChat.module.css'

const WebChat = () => {
	return (
		<div className={styles.container}>
			<ConversationBar />
			<ChatWindow />
			<FriendsBar />
		</div>
	)
}

export default WebChat
