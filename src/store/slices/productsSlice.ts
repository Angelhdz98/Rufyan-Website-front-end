import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsBycategory } from "../thunks/fetchProductsByCategory";
import type { Product } from "../../types/typesIndex";

export interface ProductState {
    data: Product[];
    isLoading: boolean;
    error: string|null ;
};

const initialState:ProductState = {
    data: [],
    isLoading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

        builder.addCase(fetchProductsBycategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchProductsBycategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data=action.payload;
        })
        builder.addCase(fetchProductsBycategory.rejected, (state,action)=> {
            state.isLoading = false;
            state.error = action.payload as string
        })
    
    }
});

export const productsReducer= productsSlice.reducer;