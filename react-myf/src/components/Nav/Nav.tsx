import React from 'react'

import styles from './Nav.module.css'

const Nav = () => {
	return (
		<nav className={styles.container}>
			<ul className={styles.navList}>
				<li>Home</li>
				<li>About</li>
				<li>Contact</li>
				<li>Settings</li>
			</ul>
		</nav>
	)
}

export default Nav
