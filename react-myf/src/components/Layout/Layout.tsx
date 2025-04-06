import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import styles from './Layout.module.css'

interface LayoutProps {
	children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header></Header>
			<main>{children}</main>
			<Footer></Footer>
		</div>
	)
}

export default Layout
