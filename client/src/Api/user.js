import axios from 'axios';


export const url = process.env.NODE_ENV === 'development' && 'http://localhost:8000/api';

export const getChats = () => axios.get(`${url}/chats`);
export const getChat = () => axios.get(`${url}/chats/:id`);
