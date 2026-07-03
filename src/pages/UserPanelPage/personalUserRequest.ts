import { userDTO } from "../../types/typesIndex";
import { api } from "../ControlPanel/axios";



export interface updatePasswordCommand {
    userId: number,
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string

}


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

export interface updateEmailParams {
    newEmail: string
    password: string
}

export const updateEmail = async (newEmail: string, password: string) => {

    try {

        console.log("new email: " + newEmail + " password: " + password);

        const response = await api.put("/user/update-email", { newEmail: newEmail, password: password });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("respuesta recibida de actualizar el email: ", JSON.stringify(response.data));

        const data = response.data as userDTO;

        return data;
    } catch (error) {
        console.error("Error actualizando el email. del usuario: ", error);
        throw error;
    }
}

export const updateUsername = async (newUsername: string, password: string) => {

    try {

        console.log("new username: " + newUsername + " password: " + password);

        const response = await api.put("/user/update-username", { newUsername: newUsername, password: password, userId: 1 });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("respuesta recibida de actualizar el username: ", JSON.stringify(response.data));

        const data = response.data as userDTO;

        return data;
    } catch (error) {
        console.error("Error actualizando el username del usuario: ", error);
        throw error;
    }
}

export const isUsernameAvailableRequest = async (checkUsername: string) => {

    try {

        console.log("Checking for username: " + checkUsername);

        const response = await api.get("/user/username-check/" + checkUsername);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("respuesta recibida de actualizar el username: ", JSON.stringify(response.data));

        const data = response.data as boolean;

        return data;
    } catch (error) {
        console.error("Error actualizando el username del usuario: ", error);
        throw error;
    }

}

export const updateUserPasswordRequest = async (command: updatePasswordCommand) => {

    try {



        const response = await api.put("/user/update-password", command);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("respuesta recibida de actualizar el password: ", JSON.stringify(response.data));


    } catch (error) {
        alert("Error actualizando el username del usuario: " + error);
        throw error;
    }


}