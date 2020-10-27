import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import { useRecoilState } from 'recoil'
import { stateAccessToken } from '../state/appState'
import Main from './Main'
import axios from '../axios'

const Home = () => {
	const [token, setToken] = useRecoilState(stateAccessToken)

	useEffect(() => {
		const fetchClientIdAndSecret = async () => {
			const res = await axios.get(`/api/fhir/accessToken`)
			let resToken = res.data.response
			setToken(resToken)
		}
		fetchClientIdAndSecret()
	}, [])

	console.log('token', token)
	return (
		<div>
			{Object.keys(token).length ? (
				<Router>
					<Header />
					<Switch>
						<Route path='/' component={Main} exact />
						<Route
							path='/login'
							exact
							render={() =>
								(window.location = `https://quick.1up.health/connect/4706?access_token=${token.access_token}&state=stateString&bg=white`)
							}
						/>
						<Route path='/patients' component={() => <div>patients</div>} exact />
						<Route path='/patients/:id' component={() => <div>patients id</div>} exact />
						<Route path='/home' component={Home} />
					</Switch>
				</Router>
			) : (
				<div> loading</div>
			)}
		</div>
	)
}
export default Home
