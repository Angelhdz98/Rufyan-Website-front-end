import { configureStore } from "@reduxjs/toolkit";
import { paintingsReducer } from "./slices/paintingsSlice";
import { projectsReducer } from "./slices/projectsSlice";
import { otherProductSliceReducer } from "./slices/otherProductSlice";
import { formPaintingReducer,
        updateForm,
         addImage,
         deleteImage } from "./slices/formPaintingSlice";
import { setSortBy,
     toggleSortOrder,
      beginSorting } from "./slices/sortProductSlice";
      import { updateStatePainting, deleteStateImage } from "./slices/singlePaintingSlice";
import { productsReducer } from "./slices/productsSlice";
import { sortProductsReducer } from "./slices/sortProductSlice";
import { singleProductReducer } from "./slices/singleProductSlice";
import { singlePaintingReducer } from "./slices/singlePaintingSlice";
import { selectOptionsReducer } from "./slices/selectOpitonsSlice";
import { changeOption } from "./slices/selectOpitonsSlice";
import { cartItemReducer } from "./slices/cartItemsSlice";


const store = configureStore({
    reducer:{
        paintings:paintingsReducer,
        projects:projectsReducer,
        otherProducts:otherProductSliceReducer,
        formPainting:formPaintingReducer,
        products:productsReducer,
        sortProducts:sortProductsReducer,
        singleProduct:singleProductReducer,
        singlePainting:singlePaintingReducer,
        selectOption: selectOptionsReducer,
        cartItem:cartItemReducer,
    },
});

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export * from './thunks/fetchFavPaintings'
export * from './thunks/fetchPaintings'
export * from './thunks/addPainting'
export * from './thunks/fetchProductsByCategory'
export * from './thunks/fetchProductById'
export * from './thunks/updatePainting'
export * from './thunks/deleteImagePainting'
export * from './thunks/fetchPaintingById'
export * from './thunks/addOption'
export * from './thunks/fetchOptions'
export * from './thunks/changeCartItemQuantity'
export * from './thunks/deleteCartItem'

export {updateForm, addImage,deleteImage, setSortBy,toggleSortOrder, beginSorting,updateStatePainting, deleteStateImage, changeOption }


export default store;