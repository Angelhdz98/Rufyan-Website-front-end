import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { EditPainting, Painting } from "../../types/typesIndex";
//import { Painting } from "../../types/typesIndex";
//import { PaintingsState } from "../slices/paintingsSlice";
//import { Product } from "../../types/typesIndex";


export interface updatePaintingParams{
    formData: FormData;
    id:number;
}

const updatePainting = createAsyncThunk('painting/updatePaintings', 
    async ({formData, id}:updatePaintingParams , thunkAPI) =>{
        
        try{
    const response = await axios.put(`http://localhost:8080/paintings/${id}`, formData,{
        headers: {
            'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido
        },
    });
    console.log("Valor de response data: " + response.data);
    return  response.data;
} catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});


 



export {updatePainting};