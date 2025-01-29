import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	id: '',
    email: '',
    pp: '',
    metaData: {},
    userName: '',
    lastUpdated: '',
	isOnline: false
}
const activeUserSlice = createSlice({
	name: 'activeUser',
    initialState,
    reducers: {
        setActiveUser: (state, { payload }) => {
			state.id = payload.id
			state.email = payload.email
			state.pp = payload.pp
			state.metaData = payload.metaData
			state.userName = payload.userName
			state.lastUpdated = payload.lastUpdated
			state.isOnline = payload.isOnline
		},
		setUserMetaData: (state, { payload }) => {
			state.userName = payload.userName
			state.metaData = payload.metaData
		}
    }
})

export const { actions } = activeUserSlice.actions;
export default activeUserSlice.reducer;