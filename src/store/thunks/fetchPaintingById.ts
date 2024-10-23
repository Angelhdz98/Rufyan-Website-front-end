
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//import { Painting } from "../../types/typesIndex";
//import { PaintingsState } from "../slices/paintingsSlice";
//import { Product } from "../../types/typesIndex";


const fetchPaintingById = createAsyncThunk('singlePainting/fechPaintingById', 
    async (id: number , thunkAPI) =>{
        
        try{
    const response = await 
    axios.get(`http://localhost:8080/paintings/${id}`);
    const data = response.data;
    console.log(data);
    return  data;
} catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }

});


 



export {fetchPaintingById};