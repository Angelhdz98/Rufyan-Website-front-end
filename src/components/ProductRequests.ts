
import { api } from "../pages/ControlPanel/axios"
import { Page, Product, ProductDTO } from "../types/typesIndex";
import { SorterTypeEnum, SortOrderEnum } from "./Sorter";
import mapBackendProductToFrontend from "../pages/ControlPanel/ProductBackendMapper";





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


export const handleGetPagedProducts = async (
    sorterType: SorterTypeEnum,
    pageNumber: number,
    pageSize: number,
    sortOrder: SortOrderEnum) => {
    try {
        // Construir la URL con parámetros de paginación
        //const url = new URL("/admin/products-paged-custom", window.location.origin);



        // Realizar petición GET
        const response = await api.get("/admin/products-paged-custom", {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                sortOrder: sortOrder,
                sorterType: sorterType,
            }
        });

        console.log("parametros: pageNumber: " + pageNumber, " pageSize: " + pageSize + " sortOrder: ", sortOrder, " sorttype: " + sorterType);


        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.data as Page<Product>;
        console.log("Productos obtenidos exitosamente:", data);
        return data; // Retorna Page<Product>
    } catch (error) {
        console.error("Error al obtener los productos paginados:", error);
        throw error;
    }
};

export const handleGetProductEntityForEditingById = async (productId: number) => {
    try {

        const response = await api.get("/admin/find-product-entity-by-id/" + productId, {
            method: "GET"
        });
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = response.data;
        console.log("Productos obtenidos exitosamente:", data);
        return mapBackendProductToFrontend(data);
    } catch (error) {
        console.error("Error al obtener el producto por id:", error);
        throw error;
    }
}



export const handleDeleteProductById = async (idToDelete: number) => {



    const response = await api.delete("/products/" + idToDelete, {
        method: "DELETE"
    });
    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }




}
