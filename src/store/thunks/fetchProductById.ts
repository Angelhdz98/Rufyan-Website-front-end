

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface RequestParams {
  category: string;
  id: number ;
}

const fetchProductById= createAsyncThunk('products/fetchByCategoryAndId', async ({category,id}:RequestParams)=>{
    const response = await axios.get(`http://localhost:8080/${category}/${id}`);
    
    const data = response.data;
    //console.log(data);


return [data];


});

export {fetchProductById};
