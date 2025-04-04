import { createSlice, PayloadAction } from "@reduxjs/toolkit";


import { PaintingFormProps } from "../../pages/ControlPanel/AddPaintingForm";
import { addPainting } from "../thunks/addPainting";
import { updatePainting } from "../thunks/updatePainting";

interface formDataPainting {
    data: PaintingFormProps
    isLoading: boolean,
    error: string | null
}

const initialState: formDataPainting = {
    data: {
        name: "",
        price: 1000,
        description: '',
        category: {id:1, category:"painting"},
        altura_cm: 40,
        largo_cm: 30,
        available_copies: 12,
        copies_made: 15,
        price_copy: 300,
        original_available: true,
        favorite: false,
        support_material: '',
        medium: '',
        image: [],
        
    },
    isLoading: false,
    error: null,
}

const formPaintingSlice = createSlice({
    name: 'paintingForm',
    initialState,
    reducers: {
        updateForm: (state, action)=>{
            state.data = action.payload as PaintingFormProps;   
        },
        addImage:(state, action: PayloadAction<File[]>) => {
            state.data.image =[...action.payload]
            //state.data.previewImages = action.payload.map(file=>URL.createObjectURL(file));
        },
        deleteImage:(state, action: PayloadAction<string>) => {
            const updated= state.data.image.filter((img)=>{
                return img.name != action.payload
            })

            state.data.image=updated
            
           // state.data.previewImages = state.data.image.map(file=>URL.createObjectURL(file));
        },
       

    },
    extraReducers(builder){
        
        builder.addCase(addPainting.pending, (state)=>{
            state.isLoading= true;
            state.error= null;
        })
        builder.addCase(addPainting.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.error= null;
            state.data= action.payload;
        })
        builder.addCase(addPainting.rejected, (state, action)=>{
            state.isLoading= true;
            state.error= action.payload as string;
    
        })

        builder.addCase(updatePainting.pending, (state)=>{
            state.isLoading= true;
            state.error= null;
        })
        builder.addCase(updatePainting.fulfilled, (state, action)=>{
            state.isLoading= false;
            state.error= null;
            state.data= action.payload;
        })
        builder.addCase(updatePainting.rejected, (state, action)=>{
            state.isLoading= true;
            state.error= action.payload as string;
    
        })
    }
    
})

export const formPaintingReducer = formPaintingSlice.reducer;
export const {updateForm, addImage, deleteImage} = formPaintingSlice.actions;