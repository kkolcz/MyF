import React from 'react'

import styles from './ConversationItem.module.css'

const ConversationItem = () => {
	const name = 'Jan Nowak'
	const isOnline = true
	const lastMessage = 'Cześć, jak się masz?'
	const lastMessageTime = '12:00'
	const unreadMessages = 5

	return (
		<div className={styles.container}>
			<p className={styles.name}>{name}</p>
			<p className={styles.status}>{isOnline ? 'Online' : 'Offline'}</p>
			<p className={styles.lastMessage}>{lastMessage}</p>
			<p className={styles.lastMessageTime}>{lastMessageTime}</p>
			{unreadMessages > 0 && (
				<div className={styles.unreadMessages}>
					<p>{unreadMessages}</p>
				</div>
			)}
		</div>
	)
}

export default ConversationItem
