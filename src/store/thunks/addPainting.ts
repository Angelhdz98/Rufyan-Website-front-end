import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { Painting } from "../../types/typesIndex";
import {  PaintingFormProps } from "../../pages/ControlPanel/AddPaintingForm";
//import { PaintingsState } from "../slices/paintingsSlice";
//import { Product } from "../../types/typesIndex";


const addPainting = createAsyncThunk('painting/addPaintings', 
    async (formData: FormData , thunkAPI) =>{
        
        try{
    const response = await axios.post('http://localhost:8080/paintings/create', formData,{
        headers: {
            'Content-Type': 'multipart/form-data', // Especificar el tipo de contenido
        },
    });
    
    return  response.data;
} catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});


 



export {addPainting};