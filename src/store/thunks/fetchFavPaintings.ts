import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Painting } from "../../types/typesIndex";
//import { PaintingsState } from "../slices/paintingsSlice";
//import { Product } from "../../types/typesIndex";


const fetchFavPaintings = createAsyncThunk('products/fetchFavPaintings', async () =>{
       // try{
    const response = await axios.get('http://localhost:8080/paintings/favorites');
    
    // dev only
    
   // await pause(1000);
    //console.log(response);
    const data = response.data.map((paint:Painting)=>({
        ...paint,
        creation_date: 'fecha',
    }));
    console.log(data);
    return  data;
//} catch(error:any){
//    return thunkApi.rejectWithValue(error.response.data);
//}

});
/*
const  pause = (duration:number) =>{
    return new Promise((resolve)=>{
    setTimeout(resolve, duration);
    });
    };
*/
//Dev only 

 



export {fetchFavPaintings};