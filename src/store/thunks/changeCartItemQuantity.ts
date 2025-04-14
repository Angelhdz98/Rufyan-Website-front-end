import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*would be nice if the function can have three posible responses: 
 1st: if function argument is a positive number  API will verify on DB if is another piece available of the selected product and if so will add one to cart (quantity + 1) 
 2nd: if function argument is a negative number API will decrease value from quantity in cart, meanwhile in product will increase the value from available ones
 3rd: if function argument is a 0 will reset the value to One (if user change cartItem, which has selected a quantity bigger than 1 from a copy of a paint and change for a original it will reset the number)
    *
*/
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