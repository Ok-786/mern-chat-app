import { createSlice } from '@reduxjs/toolkit';

const initUserState = {
    chats: [],
    login: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        FETCH_CHATS(state, action) {
            state.chats = action.payload;
        },
        CHANGE_LOGIN(state, action) {
            state.login = action.payload
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice; 