import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {$host} from "../../axios";

export const fetchBrands = createAsyncThunk("brands/fetchBrands", async () => {
    const { data } = await $host.get('/brand');
    return data
})

interface brandI {
    id: number,
    name: string,
    photo: string,
}

interface initStateI {
    allBrands: Array<brandI>,
    status: string
}

const initialState: initStateI = {
    allBrands: [],
    status: "loading"
}

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        addBrand(state, action) {
            state.allBrands = [...state.allBrands, action.payload]
        },

        removeBrand(state, action) {
            console.log(action);
            state.allBrands = state.allBrands.filter(item => item.id !== action.payload)
        },

        editBrand(state, action) {
            console.log(action);
            state.allBrands = state.allBrands.map(item => {
                if(item.id === action.payload.id) {
                    return action.payload
                }

                return item
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBrands.pending, (state) => {
            state.allBrands = [];
            state.status = "loading";
        });
        builder.addCase(fetchBrands.fulfilled, (state, action: PayloadAction<Array<object>>) => {
            // @ts-ignore
            state.allBrands = action.payload;
            console.log('state.allBrands', action.payload)
            state.status = "loaded";
        });
        builder.addCase(fetchBrands.rejected, (state) => {
            state.allBrands = [];
            state.status = "error";
        });
    }
})

export const brandReducer = brandsSlice.reducer;

export const {addBrand, removeBrand, editBrand} = brandsSlice.actions;