import { api } from "../pages/ControlPanel/axios"
import { Page, ProductDTO } from "../types/typesIndex";

export const requestFavoriteProducts = async () => {
    try {
        const response = await api.get("/products/favorite");

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }


        console.log("Respuesta recibida de productos favoritos: " + JSON.stringify(response.data))

        const data = response.data as Page<ProductDTO>;

        return data;
    } catch (error) {
        console.error("Error al obtener los productos favoritos:", error);
        throw error;
    }
}