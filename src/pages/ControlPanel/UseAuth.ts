import { TokenResponse } from "../../types/typesIndex";
import { setAccessToken } from "./authStore";
import { api } from "./axios";

interface LoginCommand {
    identificator: string; // email del usuario
    password: string; // contraseña del usuario
}



/**
 * Realiza una petición POST de login
 * @param email - Email del usuario
 * @param password - Contraseña del usuario
 * @returns TokenResponse con el accessToken y refreshToken (en cookies)
 */
export const loginRequest = async (email: string, password: string): Promise<TokenResponse> => {
    try {
        const loginCommand: LoginCommand = {
            identificator: email,
            password: password
        };

        const response = await api.post<TokenResponse>("/auth/login", {
            identificator: loginCommand.identificator,
            password: loginCommand.password
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Error en login: ${response.status} ${response.statusText}`);
        }

        console.log("Login exitoso:", response.data);

        const tokenResponse = response.data as TokenResponse;
        setAccessToken(tokenResponse.access_token);
        return tokenResponse;
    } catch (error) {
        console.error("Error al realizar login:", error);
        throw error;
    }
};
