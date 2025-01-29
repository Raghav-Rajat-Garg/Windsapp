import axios from 'axios'

const API = (token) => {
    const baseURL = process.env.REACT_APP_ENDPOINT;
    console.log("API Base URL:", baseURL); // Debugging line
    return axios.create({
        baseURL: baseURL,
        headers: {
            authorization: token
        }
    });
};


export const fetchMessages = async (id) => {
	try {
		const token = localStorage.getItem('token')
		console.log(token)
		const {data} = await API(token).get(`/api/message/677fafee6185fdbaceb72479`)
		console.log(data)
		return data;
	} catch (error) {
		console.log('errror in msg api:', error)
	}
}

export const sendMessage = async (body) => {
	try {
        const token = localStorage.getItem('token')
        const {response} = await API(token).post('/api/message', body)
		return response.data;
    } catch (error) {
        console.log('error in sending message:', error)
    }
}