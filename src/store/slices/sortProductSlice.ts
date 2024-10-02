import { createSlice } from "@reduxjs/toolkit";

// Estado inicial en tu slice de Redux

interface sortProducState{
    
    sortBy:  string;
    sortOrder: 'asc'|'desc'

}

const initialState:sortProducState = {
    sortBy: "fecha", // Propiedad por la cual ordenar
    sortOrder: "asc", // "asc" o "desc" para ascendente o descendente
  };

const sortProductSlice = createSlice({

    name: 'sortinProducts',
    initialState,
    reducers:{
        setSortBy: (state, action) => {
            state.sortBy = action.payload; // puede ser "fecha", "titulo", "precio"
            //console.log("sortBy: "+ state.sortBy +" sortOrder: "+ state.sortOrder);
          },
          toggleSortOrder: (state) => {
            state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc';
            //console.log("sortBy: "+ state.sortBy +" sortOrder: "+ state.sortOrder);
          },
          beginSorting: (state) =>{
                state.sortOrder = 'desc';// defaul desceending sorting seted
                //console.log("sortBy: "+ state.sortBy +" sortOrder: "+ state.sortOrder);
 

          }
          /*//
          setProducts: (state, action) => {
            state.products = action.payload;
          },
          */

    }
})

export const {setSortBy,toggleSortOrder, beginSorting} = sortProductSlice.actions;
export const sortProductsReducer= sortProductSlice.reducer;


