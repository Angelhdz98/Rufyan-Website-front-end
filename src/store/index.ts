import { configureStore } from "@reduxjs/toolkit";
import { paintingsReducer } from "./slices/paintingsSlice";
import { projectsReducer } from "./slices/projectsSlice";
import { otherProductSliceReducer } from "./slices/otherProductSlice";

const store = configureStore({
    reducer:{
        paintings:paintingsReducer,
        projects:projectsReducer,
        otherProducts:otherProductSliceReducer,

    },
});

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchFavPaintings'


export default store;