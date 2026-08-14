

/*
//item details specs 
 //Item quantity
 //
*/

import { api } from "../pages/ControlPanel/axios";
import { CartItemDetails, ShoppingCartDTO } from "../types/typesIndex";

export const addCartItemRequest = async (productId:number, cartItemDetails:CartItemDetails) => {
    
    const response = await api.put("/shopping-cart/add-item", {
        productId, cartItemDetails
    }); 

    if(response.status !== 200 && response.status !== 201){
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.data as ShoppingCartDTO;
    
}


export const removeCartItemRequest = async (cartItemId: number)=>{

    const response = await api.put("/shopping-cart/remove-item/"+cartItemId);

if(response.status !== 200 && response.status !== 201){
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.data as ShoppingCartDTO; 


}

export const getCartItems = async () =>{
    
    const response  = await api.get("/shopping-cart"); 
    if(response.status !== 200 && response.status !== 201){
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.data as ShoppingCartDTO; 


}