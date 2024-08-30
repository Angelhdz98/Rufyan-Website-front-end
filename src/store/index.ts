import { configureStore } from "@reduxjs/toolkit";
import { paintingsReducer } from "./slices/paintingsSlice";
import { projectsReducer } from "./slices/projectsSlice";
import { otherProductSliceReducer } from "./slices/otherProductSlice";
import { formPaintingReducer, updateForm, addImage } from "./slices/formPaintingSlice";

const store = configureStore({
    reducer:{
        paintings:paintingsReducer,
        projects:projectsReducer,
        otherProducts:otherProductSliceReducer,
        formPainting:formPaintingReducer

    },
});

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchFavPaintings'
export * from './thunks/addPainting'
export {updateForm, addImage}


export default store;