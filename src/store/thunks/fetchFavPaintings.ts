import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../types/typesIndex";


const fetchFavPaintings= createAsyncThunk('prodcucts/fetchFavPaintings', 
    async () =>{
    const response = await axios.get('http://localhost:3001/products');
    // dev only
    await pause(1000);
    return response.data.filter((product:Product )=>{
         product.category ==='painting' && product.favorite===true});
});

const  pause = (duration:number) =>{
    return new Promise((resolve)=>{
    setTimeout(resolve, duration);
    });
    };

//Dev only 



export {fetchFavPaintings}
;