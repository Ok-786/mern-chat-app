import * as api from '../../Api/user';
import { userActions } from '../Reducers/user';

export const fetchChats = () => {
    return async dispatch => {
        try {
            const { data } = await api.getChats();
            dispatch(
                userActions.FETCH_CHATS(data)
            );
        } catch (error) {
            console.log(error)
        }
    }
}

export const signin = (response) => {
    return async dispatch => {
        try {
            localStorage.setItem('chat-app-user', JSON.stringify(response));
            dispatch(userActions.CHANGE_LOGIN(true));
        } catch (error) {
            console.log(error)
        }
    }
}


export const signout = () => {
    return async dispatch => {
        try {
            localStorage.removeItem("chat-app-user");
            dispatch(userActions.CHANGE_LOGIN(false));
        } catch (error) {
            console.log(error)
        }
    }
}

export const isSignin = () => {
    console.log("aasa", localStorage.getItem('chat-app-user'));
    return async dispatch => {
        localStorage.getItem('chat-app-user') ? dispatch(userActions.CHANGE_LOGIN(true)) : dispatch(userActions.CHANGE_LOGIN(false));
    }
}