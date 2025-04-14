import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const deleteCartItem = createAsyncThunk( 'cartItems/delete-item',
    async({userId, cartItemId}:{ cartItemId:number, userId:number},thunkAPI) => {

try {   
    const response = await axios.delete(`http://localhost:8080/cartItem/${userId}/${cartItemId}`);
    return response.data;
   
   } catch(error:any){
       return thunkAPI.rejectWithValue(error.response.data);
   }

})


export {deleteCartItem};