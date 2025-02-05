import { createSlice } from "@reduxjs/toolkit";
import { OptionSelect } from "../../types/typesIndex";
import { addOption } from "../thunks/addOption";
import { fetchOptions } from "../thunks/fetchOptions";


interface OptionsFetching{
    data: OptionSelect[],
    isLoading: boolean,
    error: string|null
}

const initialState: OptionsFetching = {
    data: [{name:"Select",label:"selecciona una Opción",id:0},
        {name:"Select2",label:"selecciona otra Opción",id:-1},
    ],
    isLoading: false,
    error:null,
}

const selectOptionsSlice = createSlice({
    name: 'optionsSlice',
    initialState,
    reducers:{
        changeOption: (state, action) => {
            state.data=action.payload;
        
        },
        


    },
    extraReducers:(builder)=>{
        builder.addCase(addOption.pending, (state)=>{
            state.isLoading= true;
            state.error= null; 
        });

        builder.addCase(addOption.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.data= [state.data, action.payload];
            state.error= null; 
        });
        builder.addCase(addOption.rejected, (state, action)=>{
            state.isLoading= false;
            state.error= action.payload as string; 
        });
        
        
        builder.addCase(fetchOptions.pending, (state)=>{
            state.isLoading= true;
            state.error= null; 
        });

        builder.addCase(fetchOptions.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.data= action.payload;

        });
        builder.addCase(fetchOptions.rejected, (state, action)=>{
            state.isLoading= false;
            state.error= action.payload as string; 
        });

    }
});

export const selectOptionsReducer = selectOptionsSlice.reducer;

export const {changeOption} = selectOptionsSlice.actions;




