import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { OptionSelectRequest } from "../../types/typesIndex";




const addOption = createAsyncThunk('options/', 
    async (newOption:OptionSelectRequest , thunkAPI,) =>{

        try {
            const response= await axios.post(`http://localhost:8080/paintings/${newOption.name}`, newOption);

            return response.data;
            
        }
        catch (error: any){
            return thunkAPI.rejectWithValue(error.response.data);
        }

    }
);


export {addOption};
