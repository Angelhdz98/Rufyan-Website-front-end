import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../types/typesIndex";


const fetchPaintings= createAsyncThunk<Product[], void>('prodcucts/fetchPaintings', async () =>{
    const response = await axios.get('http://localhost:3001/painting');
    // dev only
    await pause(1000);
    return response.data.filter((product:Product )=> product.category ==='painting');
})
const  pause = (duration:number) =>{
    return new Promise((resolve)=>{
    setTimeout(resolve, duration);
    });
    };

//Dev only 



export {fetchPaintings}