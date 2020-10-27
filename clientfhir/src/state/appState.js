import { atom } from 'recoil'

export const stateAccessToken = atom({
	key: 'accessToken',
	default: {},
})
export const authState = atom({
	key: 'auth',
	default: false,
})
