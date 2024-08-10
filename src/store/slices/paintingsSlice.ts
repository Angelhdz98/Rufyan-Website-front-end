import { createSlice} from '@reduxjs/toolkit';
import { Painting} from '../../types/typesIndex';
import { fetchFavPaintings } from '../thunks/fetchFavPaintings';
/**
 * import obra2 from "../../assets/Images/imgObras/obra2.jpg"
import obra3 from "../../assets/Images/imgObras/obra3.jpg"
import obra4 from "../../assets/Images/imgObras/obra4.png"
import obra5 from "../../assets/Images/imgObras/obra5.png"
import obra6 from "../../assets/Images/imgObras/obra6.png"
import obra7 from "../../assets/Images/imgObras/obra7.png"
*/

export interface PaintingsState {
  data: Painting[];
  isLoading: boolean;
  error: string|null;
  
}

/**
const initialState: PaintingsState = {
  data:  [
    {
      id: 1,
      name: "Paisaje Tranquilo",
      description: "Pintura al óleo de un paisaje sereno",
      price: 1200.00,
      category: "painting",
      favorite:false,
      dateCreated: "2023-05-15",
      userId: 1,
      images: [
        obra2,
        obra3
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: false,
        available_copies: 2,
        copies_made: 8,
        copy_price:300,

      }
    },
    {
      id: 8,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12,
        copy_price:300,
      }
    },
    {
      id: 17,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 16,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 15,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 13,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 12,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 11,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 10,
      name: "Graffiti Acuarela",
      description: "Pintura al óleo en acuarela de un Graffiti",
      price: 1000.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-18",
      userId: 1,
      images: [
        obra4,
        obra5      
      ],
      specific_attributes: {
        dimensions: [60,90],
        medium: "Óleo",
        support_material: "Lienzo",
        "certificate_of_authenticity": true,
        "original_availability": true,
        "available_copies": 4,
        "copies_made": 12
      }
    },
    {
      id: 9,
      name: "Como Tesla",
      description: "figuras abstrasctas formando un semblante, parece tesla",
      price: 1400.00,
      category: "painting",
      favorite:true,
      dateCreated: "2023-05-20",
      userId: 1,
      images: [
        obra6,
        obra7
      ],
      specific_attributes: {
        dimensions: [100, 80],
        medium: "Acrilico",
        support_material: "Lienzo",
        certificate_of_authenticity: true,
        original_availability: false,
        available_copies: 12,
        copies_made: 15
      }
    },

  ],
  isLoading: false,
  error: null,
}; //hecho para pruebas
 */
 const initialState:PaintingsState ={
  data:[],
  isLoading: false,
  error: null,
} 
const paintingsSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers:{
    addPainting: (state, action) =>{
      state.data.push(action.payload)
    }
  },
  extraReducers(builder){
    builder.addCase(fetchFavPaintings.pending, (state)=>{
      state.isLoading=true;
      state.error=null;
    });
    builder.addCase(fetchFavPaintings.fulfilled, (state, action)=>{
      state.isLoading=false;
      state.data= action.payload;
    })
    builder.addCase(fetchFavPaintings.rejected, (state, action)=>{
      state.isLoading=false;
      state.error = action.payload as string;
    })
  },
});


export const paintingsReducer =paintingsSlice.reducer;