import React from 'react'
import { authState } from '../state/appState'
import { useRecoilState } from 'recoil'
import qs from 'query-string'
import Patients from './patients'

const Main = (props) => {
	// const [auth, setAuth] = useRecoilState(authState)
	let { state, success } = qs.parse(props.location.search)
	return <div>{state && success == 'true' ? <Patients /> : <h1>main component</h1>}</div>
}
export default Main
