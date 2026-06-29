import { userDTO } from "../../types/typesIndex";
import { api } from "../ControlPanel/axios";


export const personalUserRequest = async () => {

    try {
        const response = await api.get("/user-info");

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("respuesta recibida de información de usurio: ", JSON.stringify(response.data));

        const data = response.data as userDTO;

        return data;
    } catch (error) {
        console.error("Error al obtener los productos favoritos:", error);
        throw error;
    }


}

