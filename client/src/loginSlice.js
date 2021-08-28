import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'loginState',

    initialState:{
        isLogggedIn:false,
        user:{}
    },

    reducers:{
        login: (state,action) => {
            // state.isLogggedIn = action.payload.isLoggedIn;
            // state.token = action.payload.token;
            // state.user = action.payload.user;
            return action.payload;
        }
    }
})

export const {login} = loginSlice.actions;

export default loginSlice.reducer;