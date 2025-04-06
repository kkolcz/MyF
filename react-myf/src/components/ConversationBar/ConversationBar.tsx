import React from 'react'
import ConversationItem from '../ConversationItem/ConversationItem'

import styles from './ConversationBar.module.css'

const ConversationBar = () => {
	return (
		<div className={styles.container}>
			<ConversationItem />
			<ConversationItem />
			<ConversationItem />
		</div>
	)
}

export default ConversationBar
