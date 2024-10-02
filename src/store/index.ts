import { configureStore } from "@reduxjs/toolkit";
import { paintingsReducer } from "./slices/paintingsSlice";
import { projectsReducer } from "./slices/projectsSlice";
import { otherProductSliceReducer } from "./slices/otherProductSlice";
import { formPaintingReducer, updateForm, addImage, deleteImage } from "./slices/formPaintingSlice";
import { setSortBy, toggleSortOrder, beginSorting } from "./slices/sortProductSlice";
import { productsReducer } from "./slices/productsSlice";
import { sortProductsReducer } from "./slices/sortProductSlice";

const store = configureStore({
    reducer:{
        paintings:paintingsReducer,
        projects:projectsReducer,
        otherProducts:otherProductSliceReducer,
        formPainting:formPaintingReducer,
        products:productsReducer,
        sortProducts:sortProductsReducer,

    },
});

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchFavPaintings'
export * from './thunks/fetchPaintings'
export * from './thunks/addPainting'
export * from './thunks/fetchProductsByCategory'
export {updateForm, addImage,deleteImage, setSortBy,toggleSortOrder, beginSorting }


export default store;