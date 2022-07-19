import axios from 'axios';


export const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

export const axiosSignup = async (formData) => await axios.post(`${url}/api/auth/register`, formData);
export const axiosSignin = async (formData) => await axios.post(`${url}/api/auth/login`, formData);
export const axiosSendMessage = async (formData) => await axios.post(`${url}/api/messages/addmsg`, formData);
export const axiosGetAllMessages = async (formData) => await axios.post(`${url}/api/messages/getmsg`, formData);
export const axiosSetAvatarRoute = async (id, formData) => await axios.post(`${url}/api/auth/setAvatar/${id}`, formData);
export const allUsers = (id) => axios.get(`${url}/api/auth/allUsers/${id}`);
export const getChats = () => axios.get(`${url}/chats`);
export const getChat = () => axios.get(`${url}/chats/:id`);




export const fetchApiSignup = (data) => fetch(`${url}/auth/register`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
})

export const fetchApiSignin = (data) => fetch(`${url}/auth/login`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(data)
})

export const fetchApiSetAvatarRoute = (id, data) => fetch(`${url}/auth/setAvatar/${id}`, {
    // headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: data
})