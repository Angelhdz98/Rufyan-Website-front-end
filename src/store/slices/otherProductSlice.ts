/* Esta Slice tiene que ser cambiado por un fetch filtrado por los productos favoritos 
*
 */
import { Image, Product } from "../../types/typesIndex";

import { createSlice } from "@reduxjs/toolkit";
import tShirt from "../../../public/assets/Images/productos/t-shirt.png";
import print from "../../../public/assets/Images/productos/print.png";
import sticker from "../../../public/assets/Images/productos/sticker.png"
import bag from "../../../public/assets/Images/productos/bag.png"
import embriodery from "../../../public/assets/Images/productos/handmade-embriodery.png"




export interface ProductState {
    data: Product[];
    isLoading: boolean;
    error: string | null;
  }
const  imagenTshirt:Image =
{
  id:12,  
  url:tShirt,
}
const  imagenPrint:Image =
{
  id:13,  
  url:print,
}
const  imagenSticker:Image =
{
  id:14,  
  url:sticker,
}
const  imagenBag:Image =
{
  id:15,  
  url:bag,
}
const  imagenEmbriodery:Image =
{
  id:14,  
  url:embriodery,
}






const otherProductInitialState:ProductState = {
   data:[{
    id: 1,
    name: 'R T-shirt',
    description: 'Cotton t-shirt with R graffiti tag',
    price: 500,
    category: "clothes",
    creation_date: "5 di mayo",
    userId: 0,
    image: [imagenTshirt]
   },
   {
    id: 2,
    name: 'Print digital Art alkdjfokhj',
    description: 'Digital printart Redisign from a landscape',
    price: 500,
    category: "digital prints",
    creation_date: "january/12/2020 ",
    userId: 0,
    image: [imagenPrint],
   },
   {
    id: 3,
    name: 'My name is Rufyan Sticker',
    description: 'Sticker shiny ',
    price: 50,
    category: "sticker",
    creation_date: "october/12/2020 ",
    userId: 0,
    image: [imagenSticker],
   },
   {
    id: 4,
    name: 'Artist bag',
    description: 'tote bag with art inspired on the street culture',
    price: 200,
    category: "digital prints",
    creation_date: "june/12/2020 ",
    userId: 0,
    image: [imagenBag],
       },
   {
    id: 5,
    name: 'Roots in base',
    description: 'Handmade embriodery',
    price: 500,
    category: "embriodery",
    creation_date: "january/12/2023 ",
    userId: 0,
    image: [imagenEmbriodery],
    
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
