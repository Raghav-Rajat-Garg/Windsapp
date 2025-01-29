import axios from 'axios'

const API = (token) => {
	axios.create({
		baseURL: process.env.endpoint,
		headers: {
			authorization: token
		}
	})
}

export const fetchAllChats = async () => {
	try {
		const token = localStorage.getItem('token') 
		const {data} = await API(token).get('/api/chat')
		return data;
	} catch (error) {
		console.log('api error is:', error)
	}
}