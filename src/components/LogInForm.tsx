import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import { LogInRegisterProps } from "./RegisterForm";
import Logo from "./Logo";
import Button from "./Button";


import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/typesIndex";
import { loginRequest } from "../pages/ControlPanel/UseAuth";

function LogInForm({ onClick }: LogInRegisterProps) {
    const navigate = useNavigate();
    const [logData, setLogData] = useState({
        data: {
            username: '',
            password: '',
        }
    });
    const [error, setError] = useState<string>('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogData((prevState) => ({
            ...prevState, data: {
                ...prevState.data,
                [name]: value,
            },
        }));
    };
    const handleLogIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        loginRequest(logData.data.username, logData.data.password).then((response) => {
            console.log("Login Response:", response);
            console.log("ACCESS TOKEN:", response.access_token);

            const decodedToken = jwtDecode<TokenPayload>(response.access_token);
            console.log("Token decodificado:", decodedToken);
            console.log("Rol del usuario:", decodedToken.role);

            // Verificar si es admin
            if (decodedToken.role === 'ROLE_ADMIN') {
                console.log("Usuario es admin, redirigiendo...");
                navigate("/admin", { replace: true });
            } else {
                setError("Acceso denegado: Solo administradores pueden acceder.");
            }
        }).catch((error) => {
            console.error("Error en login:", error);
            setError("Error en el login: " + (error.message || "Intenta nuevamente"));
        });
    }

    return <div className=" flex flex-col w-full items-center gap-4">
        <Logo to="/" className="w-2/4 " />
        {error && (
            <div className="w-[50%] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        )}
        <form className="w-[50%]   ga " onSubmit={handleLogIn} >
            <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col w-full">
                    <FormInput type="text" value={logData.data.username} name="username" onChange={handleChange} >Username</FormInput>
                </div>
                <div className="flex flex-col w-full ">
                    <FormInput type="password" value={logData.data.password} name="password" onChange={handleChange} >Contraseña:</FormInput>
                </div>
                <div>
                    <Button secondary rounded type="submit" >Ingresar</Button>
                </div>
            </div>

        </form>

        <p className="mt-4">No tienes cuenta aún?
            <span className="text-blue-500 hover:underline hover:cursor-pointer" onClick={onClick}> register </span>
            <span> now</span>
        </p>
    </div>
}

export default LogInForm;