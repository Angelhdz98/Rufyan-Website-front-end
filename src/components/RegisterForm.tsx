import { HtmlHTMLAttributes, useEffect, useState } from "react";
import { FaCheck, FaExclamationTriangle, FaTimes } from "react-icons/fa";
//import imgLogo from "../assets/Images/logos/logoprovisionalRufyan.png" // este logo tiene que ser el circular 
import FormInput from "./FormInput";
import Logo from "./Logo";
import Button from "./Button";
import { useUserRegister } from "./useUserRegister";
import { RegisterUserCommand } from "../types/typesIndex";
export interface LogInRegisterProps {
  onClick: () => void;
}
export interface FormInputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string;
  labelClassname?: string;
  children?: string;


}

export interface RegisterUserState {
  email: string;
  password: string;
  username: string;
  firstName: string;
  secondName?: string;
  firstLastName: string;
  secondLastName: string;
  birthDate: string;
  confirmPassword: string;
  address: string;

}

function RegisterForm({ onClick }: LogInRegisterProps) {
  const [formData, setFormData] = useState({
    data: {
      birthDate: "",
      email: "",
      firstName: "",
      secondName: "",
      firstLastName: "",
      secondLastName: "",
      password: "",
      username: ""
    } as RegisterUserState
  });

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };
  useEffect(() => {
    // Simulación de la validación de disponibilidad del nombre de usuario
    if (formData.data.username) {
      setUsernameAvailable(formData.data.username !== 'RufyanOwner');
    } else {
      setUsernameAvailable(null);
    }

    // Validación de la contraseña
    const length = formData.data.password.length >= 6;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.data.password);
    const uppercase = /[A-Z]/.test(formData.data.password);
    const number = /[0-9]/.test(formData.data.password);

    setPasswordStrength({ length, specialChar, uppercase, number });
    setPasswordValid(length);
    setPasswordMatch(formData.data.password === formData.data.confirmPassword);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const registerUserCommand: RegisterUserCommand = {
      fullName: {
        firstName: formData.data.firstName, secondName: formData.data.secondName,
        firstLastName: formData.data.firstLastName,
        secondLastName: formData.data.secondLastName,
      },
      birthDate: formData.data.birthDate,
      email: formData.data.email,
      password: formData.data.password,
      username: formData.data.username,
      confirmPassword: formData.data.confirmPassword,
      address: formData.data.address,
    };
    useUserRegister(registerUserCommand);
  }

  return (<div className="flex flex-col gap-4 items-center">
    <Logo to="/" className="w-2/4 " />
    <span>Actualmente el acceso esta registrido a los administradores, disculpe las molestias</span>
    <form className=" p-4 bg-white shadow-md rounded-lg w-full" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-2 mb-4">


        <div className="max-md:col-span-2">
          <FormInput type="text" value={formData.data.firstName} name="firstName" onChange={handleChange} >1er Nombre</FormInput>
        </div>
        <div className="max-md:col-span-2">
          <FormInput type="text" value={formData.data.secondName || ""} name="secondName" onChange={handleChange} >2do Nombre (opcional)</FormInput>
        </div>
        <div className="max-md:col-span-2">
          <FormInput type="text" value={formData.data.firstLastName} name="firstLastName" onChange={handleChange}    >
            Apeido paterno
          </FormInput>
        </div>
        <div className="max-md:col-span-2">
          <FormInput type="text" value={formData.data.secondLastName} name="secondLastName" onChange={handleChange} >Apeido materno (opcional)</FormInput>
        </div>
        <div className="relative max-md:col-span-2 ">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.data.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 h-8"
          />
          {usernameAvailable !== null && (
            <span className="absolute top-9 right-2">
              {usernameAvailable ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaTimes className="text-red-500" />
              )}
            </span>
          )}
        </div>
        <div className="max-md:col-span-2" >
          <FormInput type="text" value={formData.data.email} name="email" onChange={handleChange}>Email</FormInput>
        </div>

        <div className="col-span-2">
          <FormInput type="text" name={"address"} value={formData.data.address} onChange={handleChange}>Dirección* (*Opcional)</FormInput>
        </div>
        <div>
          <FormInput type="date" name="birthDate" value={formData.data.birthDate} onChange={handleChange} >Fecha de nacimiento </FormInput>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700">Una contraseña valida debe de tener al menos de caracteres </p>
        <p className="text-gray-700">
          Una contraseña segura debe de tener mínimo:
        </p>
        <ul className="ml-4 list-disc">
          <li className="flex items-center">
            {passwordStrength.specialChar ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : (
              <FaTimes className="text-red-500 mr-2" />
            )}
            Un caracter especial
          </li>
          <li className="flex items-center">
            {passwordStrength.uppercase ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : (
              <FaTimes className="text-red-500 mr-2" />
            )}
            Una letra mayuscula
          </li>
          <li className="flex items-center">
            {passwordStrength.number ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : (
              <FaTimes className="text-red-500 mr-2" />
            )}
            Un numero
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="relative">
          <label className="block text-gray-700">
            Contraseña:
          </label>
          <input
            type="password"
            name="password"
            value={formData.data.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded mt-1 h-8"
          />
          <span className="absolute top-9 right-2">
            {passwordValid ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaTimes className="text-red-500" />
            )}
          </span>
          <span className="absolute top-9 right-10">
            {Object.values(passwordStrength).every((value) => value) ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaExclamationTriangle className="text-yellow-500" />
            )}
          </span>
        </div>
        <div className="relative">
          <label className="block text-gray-700">Confirma la contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.data.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 h-8"
          />
          <span className="absolute top-9 right-2">
            {passwordMatch ? (
              <FaCheck className="text-green-500" />
            ) : (
              <FaTimes className="text-red-500" />
            )}
          </span>
        </div>
      </div>

      <div className="text-center flex wrap">
        <p>¿Ya tienes cuenta? <span onClick={onClick}
          className="text-blue-500 hover:underline hover:cursor-pointer">Ingresar</span></p>
      </div>
      <Button success rounded type="submit"> Register</Button>
    </form></div>

  );
}

export default RegisterForm;







///////////////////////////////////////////////////////////////////////////////////////
