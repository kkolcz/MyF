import React from 'react'
import FriendsItem from '../FriendsItem/FriendsItem'

import styles from './FriendsBar.module.css'

const FriendsBar = () => {
	return (
		<div className={styles.container}>
			<FriendsItem />
			<FriendsItem />
			<FriendsItem />
		</div>
	)
}

export default FriendsBar
