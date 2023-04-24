import {configureStore} from "@reduxjs/toolkit";
import {typesReducer} from "./slice/types";

export const store = configureStore({
    reducer: {
        types: typesReducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;