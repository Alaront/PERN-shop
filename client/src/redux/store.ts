import {configureStore} from "@reduxjs/toolkit";
import {typesReducer} from "./slice/types";
import {brandReducer} from "./slice/brands";

export const store = configureStore({
    reducer: {
        types: typesReducer,
        brands: brandReducer
    }
})

export default store;
export type AppDispatch = typeof store.dispatch;