

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


export const removeCartItemRequest = async (productId: number)=>{

    const response = await api.put("/shopping-cart/remove-item/"+productId);

if(response.status !== 200 && response.status !== 201){
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.data as ShoppingCartDTO; 


}