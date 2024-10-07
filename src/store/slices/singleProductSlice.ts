import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/typesIndex";
import { fetchProductById } from "../thunks/fetchProductById";


export interface SingleProductInterface{
    data: Product[];
    isLoading: boolean;
    error: string|null ;
}
const initialState:SingleProductInterface = {
    data: [],
    isLoading: false,
    error: null,
}


const singleProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{

    },

    extraReducers(builder){

        builder.addCase(fetchProductById.pending, (state)=>{
            state.isLoading= true;
            state.error= null;
        })

        builder.addCase(fetchProductById.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.data= action.payload;
        })

        builder.addCase(fetchProductById.rejected, (state)=>{
            state.isLoading= false;
            state.error= null;
        })

    }
})

export const singleProductReducer = singleProductSlice.reducer;