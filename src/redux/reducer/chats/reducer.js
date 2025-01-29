import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchAllChats} from '../../../api/chat'

const initialState = {
	chats: [],
	activeChat: '',
	isLoading: Boolean(false),
	notifications: [],
	unreadMessages: 0,
	latestMessage: ''
}

export const fetchAllChat = createAsyncThunk('redux/chats', async () => {
	try {
		const data = await fetchAllChats()
		return data
	} catch (error) {
		console.log('error is: ', error)
	}
})

const chatSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
	  setActiveChat: (state, { payload }) => {
		state.activeChat = payload; // Update the active chat
	  },
	  addNotification: (state, { payload }) => {
		state.notifications.push(payload); // Add a new notification
	  },
	  clearNotifications: (state) => {
		state.notifications = []; // Clear all notifications
	  },
	  setNotifications: (state, {payload}) => {
		state.notifications = payload
	  }
	},
	extraReducers: (builder) => {
	  builder
		.addCase(fetchAllChat.pending, (state) => {
		  state.isLoading = true; // Set loading state
		})
		.addCase(fetchAllChat.fulfilled, (state, { payload }) => {
		  state.isLoading = false;
		  state.chats = payload; // Update chats with fetched data
		})
		.addCase(fetchAllChat.rejected, (state, { payload }) => {
		  state.isLoading = false;
		  console.error('Fetch chats failed:', payload); // Log the error
		});
	},
  });

  export const { actions } = chatSlice.actions;
export default chatSlice.reducer;