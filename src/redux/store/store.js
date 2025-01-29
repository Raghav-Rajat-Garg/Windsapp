import {configureStore} from '@reduxjs/toolkit'
import activeUserSlice from '../reducer/user/reducer'
import chatSlice from '../reducer/chats/reducer'

const store = configureStore({
	reducer: {
		activeUser: activeUserSlice,
		// pp:
		// search:
		chats: chatSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true, // Enable Redux DevTools
})

export default store;