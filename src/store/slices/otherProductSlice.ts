/* Esta Slice tiene que ser cambiado por un fetch filtrado por los productos favoritos 
*
 */
import { ImageProduct, Product } from "../../types/typesIndex";

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
  
const  imagenTshirt:ImageProduct =
{
  id:12,  
  productName: "t-shirt",
  //url: URL.createObjectURL(new Blob([tShirt])),
  url:tShirt
}
const  imagenPrint:ImageProduct =
{
  id:13,
  productName:"print",  
  //url: URL.createObjectURL(new Blob([print]))
  url:print
}
const  imagenSticker:ImageProduct =
{
  id:14,  
  productName:"sticker",
  //url: URL.createObjectURL(new Blob([sticker]))
  url:sticker,
}
const  imagenBag:ImageProduct =
{
  id:15,  
  productName:"bag",
  //url: URL.createObjectURL(new Blob([bag]))
  url: bag,
}
const  imagenEmbriodery:ImageProduct =
{
  id:14,  
  productName:"embriodery",
  //url: URL.createObjectURL(new Blob([embriodery]))
  url: embriodery
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
    available:true,
    image: [imagenTshirt]
   },
   {
    id: 2,
    name: 'Print digital Art alkdjfokhj',
    description: 'Digital printart Redisign from a landscape',
    price: 500,
    available: true,
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
    available: true,
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
    available: true,
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
    available: true,
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
