

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { Painting } from "../../types/typesIndex";
//import { PaintingsState } from "../slices/paintingsSlice";
//import { Product } from "../../types/typesIndex";

export interface DeleteImageParams{
    paintingId: number;
    imageId:number; 
}


const deleteImagePainting = createAsyncThunk('singlePainting/deleteImagePainting', 
    async ({paintingId, imageId}:DeleteImageParams, thunkAPI) =>{
        
        try{
    const response = await 
    axios.delete(`http://localhost:8080/paintings/${paintingId}/${imageId}`);
    console.log("Valor de response data: " + response.data);
    return  response.data;
} catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});


 



export {deleteImagePainting};