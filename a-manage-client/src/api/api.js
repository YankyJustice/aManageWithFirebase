import axios from "axios";

const instance = axios.create({baseURL: 'http://localhost:4000/'})


export const messagesAPI = {
	sendMessage: (data) => instance.post('messages/send', data),
	saveDraft: (data) => instance.post('messages/saveDraft', data),
	uploadDraft: (user) => instance.get(`messages/uploadDraft?user=${user}`).then(res => res.data),
	getAllMailing: () => instance.get('messages/allMailing').then(res => res.data),
	getMyMailing: (email) => instance.get(`messages/myMailing?email=${email}`).then(res => res.data)
}