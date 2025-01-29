import actions from '../../reducer/chats/reducer' 
import {fetchAllChat} from '../../reducer/chats/reducer'

export const { setActiveChat, addNotification, clearNotifications, setNotifications } = actions;
export const fetchChats = fetchAllChat;
