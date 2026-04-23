import { createSlice } from '@reduxjs/toolkit';
import { Painting, ProductTypeEnum } from '../../types/typesIndex';


import obra2 from "../../../public/assets/Images/imgObras/obra2.jpg";
import obra3 from "../../../public/assets/Images/imgObras/obra3.jpg";
import { deleteImagePainting } from '../thunks/deleteImagePainting';
import { fetchPaintingById } from '../thunks/fetchPaintingById';
import { updatePainting } from '../thunks/updatePainting';
//import { deleteImage } from './formPaintingSlice';


export interface SinglePaintingsState {
  data: Painting;
  isLoading: boolean;
  error: string | null;

}

// initial state for dev testing 
const initialState: SinglePaintingsState = {
  data: {
    id: 100000,
    name: "Obra no cargada",
    description: "Pintura al óleo de un paisaje sereno",
    productPricing: { pricePerCopy: 500, pricePerOriginal: 1500, pricingType: 'ORIGINAL' },
    isFavorite: false,


    images: [{
      id: 1,
      productName: "una obra fea",
      url: obra2,
    },
    {
      id: 2,
      productName: "una obra fea",
      url: obra3
    }
    ],
    productDomainDetails: { alturaCm: 90, largoCm: 60, medium: "Óleo", creationDate: new Date(), supportMaterial: "Lienzo", productType: ProductTypeEnum.PAINTING },
    productStock: { isOriginalAvailable: false, copiesMade: 8, availableCopies: 2, stockType: 'PAINTING_STOCK' },
    productTypeEnum: ProductTypeEnum.PAINTING.toString()




  },
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

const singlePaintingSlice = createSlice({
  name: 'paintings',
  initialState,
  reducers: {

    updateStatePainting: (state, action) => {
      state.data = action.payload;
    },
    deleteStateImage: (state, action) => {
      const update = state.data.images.filter((img) => img.id != action.payload as number);

      state.data.images = update;

    }

  },
  extraReducers(builder) {



    builder.addCase(fetchPaintingById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPaintingById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchPaintingById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteImagePainting.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteImagePainting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(deleteImagePainting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updatePainting.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updatePainting.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    builder.addCase(updatePainting.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });


  },
});


export const singlePaintingReducer = singlePaintingSlice.reducer;
export const { updateStatePainting, deleteStateImage } = singlePaintingSlice.actions;


