import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$host} from "../../axios";

export const fetchTypes = createAsyncThunk("types/fetchTypes", async () => {
    const { data } = await $host.get("/type");
    return data;
});

export const addNewType = createAsyncThunk("types/addNewType", async (params:object) => {
    const { data } = await $host.post("/type", params);
    return data;
});

interface typeI {
    id: number,
    name: string,
    slug?: string,
    createdAt?: string,
    updatedAt?: string
}

interface InitStateI {
    allTypes: Array<typeI>,
    status: string,
}

const initialState: InitStateI = {
    allTypes: [],
    status: "loading",
}

const typesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {
        addType(state, newType) {
            state.allTypes = [...state.allTypes, newType.payload];
        },

        updateType(state, action) {
            const newType: typeI = action.payload;
            state.allTypes = state.allTypes.map(item => {
                if(item.id !== newType.id) return item

                return newType
            });
        },

        removeType(state, action) {
            const id:number = action.payload;
            console.log(id)
            state.allTypes = state.allTypes.filter(item => item.id !== id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTypes.pending, (state) => {
            state.allTypes = [];
            state.status = "loading";
        });
        builder.addCase(fetchTypes.fulfilled, (state, action: PayloadAction<Array<object>>) => {
            // @ts-ignore
            state.allTypes = action.payload;
            state.status = "loaded";
        });
        builder.addCase(fetchTypes.rejected, (state) => {
            state.allTypes = [];
            state.status = "error";
        });
    },
});

export const typesReducer = typesSlice.reducer;

export const { addType, updateType, removeType } = typesSlice.actions;