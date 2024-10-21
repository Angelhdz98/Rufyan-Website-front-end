import { createSlice} from '@reduxjs/toolkit';
import { Painting} from '../../types/typesIndex';
import { fetchFavPaintings } from '../thunks/fetchFavPaintings';
import { fetchPaintings } from '../thunks/fetchPaintings';
import { addPainting } from '../thunks/addPainting';


import obra2 from "../../../public/assets/Images/imgObras/obra2.jpg"
import obra3 from "../../../public/assets/Images/imgObras/obra3.jpg"
import obra4 from "../../../public/assets/Images/imgObras/obra4.png"
import obra5 from "../../../public/assets/Images/imgObras/obra5.png"
import obra6 from "../../../public/assets/Images/imgObras/obra6.png"
import obra7 from "../../../public/assets/Images/imgObras/obra7.png"


export interface PaintingsState {
  data: Painting[];
  isLoading: boolean;
  error: string|null;
  
}

 // initial state for dev testing 
const initialState: PaintingsState = {
  data:  [
    {
      id: 1,
      name: "Paisaje Tranquilo",
      description: "Pintura al óleo de un paisaje sereno",
      price: 1200.00,
      category: {id:1,name:"painting"},
      favorite:false,
      creation_date: "2023-05-15",
      userId: 1,
      image: [{
        id: 1,
        productName: "una obra fea",
        url: obra2,
      },
      {id: 2,
      productName: "una obra fea",
       url: obra3}
      ],
        largo_cm: 60,
        altura_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: false,
        available_copies: 2,
        copies_made: 8,
        price_copy:300,


    },
    {
      id: 8,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
        id: 3,
        productName: "Obra fea con otro nombre",
        url: obra4},

        {
          id: 4,
          productName: "una obra fea made by Rufyan", 
          url: obra5}      
      ],
        altura_cm: 60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 0,
        copies_made: 12,
        price_copy:300,
      }
   ,
    {
      id: 17,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 5,
          productName: "una obra en acuarela",
          url:obra4,
        },
        {
          id: 6,
          productName: "una obra en acuarela",
          url:obra5, 
        }],
      
        altura_cm:60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:300,
      }
    ,
    {
      id: 16,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 7,
          productName: "una obra en acuarela con otro nombre",
          url:obra4, 
        },
        {
          id: 8,
          productName: "una obra en acuarela 2.0",
          url:obra5, 
        }
      ],
        altura_cm:60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:400.00,
     
    },
    {
      id: 15,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 9,
          productName: "una obra en acuarela",
          url:obra6, 
        },
        {
          id: 10,
          productName: "una obra en acuarela",
          url:obra7, 
        },
        
        
      
      ],
        available:true,
        altura_cm:60,
        largo_cm:90,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy: 280.00
      
    },
    {
      id: 13,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 11,
          productName: "una obra en acuarela",
          url:obra4, 
        },
        {
          id: 12,
          productName: "una obra en acuarela",
          url:obra4, 
        },     
      ],

        altura_cm: 60,
        largo_cm: 90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy: 450.00,

    },
    {
      id: 12,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 13,
          productName: "una obra en acuarela",
          url:obra4, 
        },
        {
          id: 14,
          productName: "una obra en acuarela",
          url:obra4, 
        },   
      ],
        altura_cm:60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:150.00,

    },
    {
      id: 11,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      available: true, 
      userId: 1,
      image: [
        {
          id: 15,
          productName: "una obra en acuarela",
          url:obra4, 
        },
        {
          id: 16,
          productName: "una obra en acuarela",
          url:obra4, 
        },   
      ],
        altura_cm: 60,
        largo_cm:90,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy: 300,
      
    },
    {
      id: 10,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-18",
      userId: 1,
      image: [
        {
          id: 17,
          productName: "una obra en acuarela",
          url:obra4, 
        },
        {
          id: 18,
          productName: "una obra en acuarela",
          url:obra4, 
        }   
      ],
        
        altura_cm: 60,
        largo_cm:90,
        available: true,
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: true,
        available_copies: 4,
        copies_made: 12,
        price_copy:320.00
      
    },
    {
      id: 9,
      name: "Como Tesla",
      description: "figuras abstrasctas formando un semblante, parece tesla",
      price: 1400.00,
      category: {id:1,name:"painting"},
      favorite:true,
      creation_date: "2023-05-20",
      userId: 1,
      image: [
        {
          id: 19,
          productName: "una obra en acuarela",
          url:obra4, 
        },
        {
          id: 20,
          productName: "una obra en acuarela",
          url:obra4, 
        },

      ],
      
        altura_cm: 100,
        largo_cm: 80,
        available:true,
        medium: "Acrilico",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: false,
        available_copies: 12,
        copies_made: 15,
        price_copy:210.00,
      
    },

  ],
  isLoading: false,
  error: null,
}; //hecho para pruebas


//Initial State will be used with the API
/*
 const initialState:PaintingsState ={
  data:[],
  isLoading: false,
  error: null,
} */

const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers:{
    
  },
  extraReducers(builder){
    builder.addCase(fetchFavPaintings.pending, (state)=>{
      state.isLoading=true;
      state.error=null;
    });
    builder.addCase(fetchFavPaintings.fulfilled, (state, action)=>{
      state.isLoading=false;
      state.data= action.payload;
    });
    builder.addCase(fetchFavPaintings.rejected, (state, action)=>{
      state.isLoading=false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchPaintings.pending, (state)=>{
      state.isLoading=true;
      state.error=null;
    });
    builder.addCase(fetchPaintings.fulfilled, (state, action)=>{
      state.isLoading=false;
      state.data= action.payload;
    });
    builder.addCase(fetchPaintings.rejected, (state, action)=>{
      state.isLoading=false;
      state.error = action.payload as string;
    });
    builder.addCase(addPainting.pending, (state)=>{
      state.isLoading=true;
      state.error=null;
    });
    builder.addCase(addPainting.fulfilled, (state, action)=>{
      state.isLoading=false;
      state.data= action.payload;
    })
    builder.addCase(addPainting.rejected, (state, action)=>{
      state.isLoading=false;
      state.error = action.payload as string;
    })

  },
});


export const paintingsReducer =paintingsSlice.reducer;

