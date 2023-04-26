import {configureStore} from "@reduxjs/toolkit";
import {typesReducer} from "./slice/types";
import {brandReducer} from "./slice/brands";
import {userReducer} from "./slice/user";

export const store = configureStore({
    reducer: {
        types: typesReducer,
        brands: brandReducer,
        user: userReducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;