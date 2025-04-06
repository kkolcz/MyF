import React from 'react'

import styles from './FriendsItem.module.css'

const FriendsItem = () => {
	const isOnline = true

	return (
		<div className={styles.container}>
			<p className={styles.name}>Jan Nowak</p>
			<p className={styles.status}>{isOnline ? 'Online' : 'Offline'}</p>
		</div>
	)
}

export default FriendsItem
