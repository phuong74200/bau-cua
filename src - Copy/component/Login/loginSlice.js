import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('token') ? true : false,
    userData: {},
};
const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userData = action.payload;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('roomID');
        },
    },
});
export const authSelector = (state) => state.auth.isAuthenticated;
export const userDataSelector = (state) => state.auth.userData;
export const { login, signOut } = loginSlice.actions;
export default loginSlice.reducer;
