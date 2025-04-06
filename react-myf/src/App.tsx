import Layout from './components/Layout/Layout'
import Settings from './pages/Settings/Settings'
import WebChat from './pages/WebChat/WebChat'

import './styles/global.css'

function App() {
	return (
		<>
			<Layout>
				<WebChat />
				{/* <Settings /> */}
			</Layout>
		</>
	)
}

export default App
