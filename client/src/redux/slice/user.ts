import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: {},
    status: 'padding'
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
          state.user = action.payload;
          state.status = 'loaded'
        }
    },
    extraReducers: {}
})

export const userReducer = userSlice.reducer;
export const {setIsAuth, setUser} = userSlice.actions;