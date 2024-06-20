import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { projectsReducer } from "./slices/projectsSlice";

const store = configureStore({
    reducer:{
        products:productsReducer,
        projects:projectsReducer,

    },
});

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchFavPaintings'


export default store;