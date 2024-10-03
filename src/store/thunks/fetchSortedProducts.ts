import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../types/typesIndex";


const fetchSortedProduct = createAsyncThunk( 'products/sorted/fetchSortedProducts', async (category:string) =>{
    
    const response = await axios.get(`http://localhost:8080/${category}`)
    const data = response.data.map((product: Product)=>({
        ...product,
        creation_date:'fecha',
    }));
    console.log("Falta implementación para el sortedFetch manda favoritos");
    return data;
} );


const  pause = (duration:number) =>{
    return new Promise((resolve)=>{
    setTimeout(resolve, duration);
    });
    };


    export {fetchSortedProduct}