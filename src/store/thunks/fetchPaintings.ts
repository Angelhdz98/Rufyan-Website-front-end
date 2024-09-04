import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Painting } from "../../types/typesIndex";

const fetchPaintings= createAsyncThunk<Painting[], void>('prodcucts/fetchPaintings', async () =>{
    const response = await axios.get('http://localhost::8080/paintings');
    
    
    const data = response.data.map((paint:Painting)=>({
        ...paint,
        creation_date: 'fecha',
    }));
    
    return  data;
})




export {fetchPaintings}