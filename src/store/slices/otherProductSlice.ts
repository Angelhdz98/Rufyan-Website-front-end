/* Esta Slice tiene que ser cambiado por un fetch filtrado por los productos favoritos 
*
 */
import { Product } from "../../types/typesIndex";

import { createSlice } from "@reduxjs/toolkit";
import tShirt from "../../assets/Images/productos/t-shirt.png";
import print from "../../assets/Images/productos/print.png";
import sticker from "../../assets/Images/productos/sticker.png"
import bag from "../../assets/Images/productos/bag.png"
import embriodery from "../../assets/Images/productos/handmade-embriodery.png"




export interface ProductState {
    data: Product[];
    isLoading: boolean;
    error: string | null;
  }

const otherProductInitialState:ProductState = {
   data:[{
    id: 1,
    name: 'R T-shirt',
    description: 'Cotton t-shirt with R graffiti tag',
    price: 500,
    category: "clothes",
    dateCreated: "5 di mayo",
    userId: 0,
    images: [tShirt],
    specific_attributes: 0,
   },
   {
    id: 2,
    name: 'Print digital Art alkdjfokhj',
    description: 'Digital printart Redisign from a landscape',
    price: 500,
    category: "digital prints",
    dateCreated: "january/12/2020 ",
    userId: 0,
    images: [print],
    specific_attributes: 0,
   },
   {
    id: 3,
    name: 'My name is Rufyan Sticker',
    description: 'Sticker shiny ',
    price: 50,
    category: "sticker",
    dateCreated: "october/12/2020 ",
    userId: 0,
    images: [sticker],
    specific_attributes: 0,
   },
   {
    id: 4,
    name: 'Artist bag',
    description: 'tote bag with art inspired on the street culture',
    price: 200,
    category: "digital prints",
    dateCreated: "june/12/2020 ",
    userId: 0,
    images: [bag],
    specific_attributes: 0,
   },
   {
    id: 5,
    name: 'Roots in base',
    description: 'Handmade embriodery',
    price: 500,
    category: "embriodery",
    dateCreated: "january/12/2023 ",
    userId: 0,
    images: [embriodery],
    specific_attributes: 0,
   },

   ],
   isLoading:false,
   error:null,
    
}

const otherProductSlice = createSlice({
    name:'otherProduct',
    initialState:otherProductInitialState,
    reducers:{
        addProduct: (state, action) =>{
          state.data.push(action.payload)
        }
      },
      extraReducers(){
        //builder.addCase //Here I will add the reducers of fetching
    }

})

export const otherProductSliceReducer = otherProductSlice.reducer;
