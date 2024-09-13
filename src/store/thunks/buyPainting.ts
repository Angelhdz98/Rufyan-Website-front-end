import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const buyPainting = createAsyncThunk('painting/buyPainting', async ({id, isOriginal}:{id:number, isOriginal:boolean}) => {
    try{
        const response = await axios.post(`http://localhost:8080/order/${id}/${isOriginal}`, );
    }
});