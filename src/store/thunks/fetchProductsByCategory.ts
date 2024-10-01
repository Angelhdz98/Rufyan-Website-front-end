import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../types/typesIndex";


const fetchProductsBycategory= createAsyncThunk('products/fetchByCategory', async (category:string)=>{
    const response = await axios.get(`http://localhost:8080/${category}`);
    const data = response.data.map((product: Product)=>{
      return  ({...product,creation_date:'fecha',})
});


return data;


});

export {fetchProductsBycategory};
