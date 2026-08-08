import { api } from "../pages/ControlPanel/axios"


export const isProductLikedRequest = async (productId: number) => {

    const response = await api.get("is-product-liked/" + productId);
    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }
    alert("el valor es: " + response.data);
    return response.data as boolean;
}

export interface ProductLikedDTO {
    productId: number
}

export const markAsLikedRequest = async (productId: number) => {


    const response = await api.post("/like/" + productId);

    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.data as boolean;


}


export const unmarkAsLikedRequest = async (productId: number) => {


    const response = await api.delete("/like/" + productId);

    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return response.data as boolean;


}
