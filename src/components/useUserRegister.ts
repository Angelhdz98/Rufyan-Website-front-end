import { setAccessToken } from "../pages/ControlPanel/authStore";
import { api } from "../pages/ControlPanel/axios";
import { RegisterUserCommand, RegisterUserDTO, UpdateUserDTO, UserEntityDTO2 } from "../types/typesIndex";


export const useUserRegister = async (registerUserCommand: RegisterUserCommand) => {
    try {
        const response = await api.post("/auth/user-register", registerUserCommand);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const userRegisterResponse = response.data as RegisterUserDTO;
        setAccessToken(userRegisterResponse.tokenResponse.access_token);
        return userRegisterResponse;
    }
    catch (error) {
        console.error("Error al realizar login:", error);
        throw error;

    }

}

export const useUserUpdate = async (info: UpdateUserDTO) => {

    console.log("Valores a enviar: " + JSON.stringify(info));
    const response = await api.put("/users", info);
    if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const user = response.data as UserEntityDTO2;

    return user;


}