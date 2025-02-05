import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const fetchOptions = createAsyncThunk/*<OptionSelect[], string>*/('resource/fetchOption',
     async (optionableResource:string) =>{
    // try{
 const response = await axios.get(`http://localhost:8080/${optionableResource}`);
 
 // dev only
 
// await pause(1000);
 //console.log(response);


 return  response.data;
//} catch(error:any){
//    return thunkApi.rejectWithValue(error.response.data);
//}

});

export {fetchOptions};