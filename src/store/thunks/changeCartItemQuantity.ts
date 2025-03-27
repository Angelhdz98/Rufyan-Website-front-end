import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const changeCartItemQuantity = createAsyncThunk( 'cartItems/change-quantity',
     async({userId, cartItemId, value}:{value:number, cartItemId:number, userId:number},thunkAPI) => {

try {   
     const response = await axios.put(`http://localhost:8080/cartItem/changeAmount/${userId}/${cartItemId}/${value}`);
     return response.data;
    
    } catch(error:any){
        return thunkAPI.rejectWithValue(error.response.data);
    }

})


export {changeCartItemQuantity};