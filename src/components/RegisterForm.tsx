import { useState,useEffect } from "react";
import { FaTimes,FaCheck,FaExclamationTriangle} from "react-icons/fa";
//import imgLogo from "../assets/Images/logos/logoprovisionalRufyan.png" // este logo tiene que ser el circular 
import Logo from "./Logo";
import FormInput from "./FormInput";
export interface LogInRegisterProps{
  onClick: () => void;
}
export interface FormInputProps  {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string;
    children:string;


}

function RegisterForm({onClick}:LogInRegisterProps) {
    const [formData, setFormData] = useState({
        data:{
        lastName: '',
        firstName: '',
        username: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',}
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


    return  (<div className="flex flex-col gap-4 items-center">
      <Logo to="/" className="w-2/4 " />
      <form className=" p-4 bg-white shadow-md rounded-lg w-full">
          <div className="grid grid-cols-2 gap-2 mb-4">
           
            <div className="max-md:col-span-2">
              <FormInput type="text" value={formData.data.lastName} name="lastName" onChange={handleChange}    >
                Last Name
                </FormInput>
                </div>
            
            <div className="max-md:col-span-2">
              <FormInput type="text" value={formData.data.firstName} name="firstName" onChange={handleChange} >First Name</FormInput>
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
              <FormInput type="text" name={formData.data.address} value={formData.data.address} onChange={handleChange}>Addrees* optional just for shipment</FormInput>
            </div>
          </div>
    
          <div className="mb-4">
            <p className="text-gray-700">A valid password must have at least 6 characters.</p>
            <p className="text-gray-700">A strong password must have at least:</p>
            <ul className="ml-4 list-disc">
              <li className="flex items-center">
                {passwordStrength.specialChar ? (
                  <FaCheck className="text-green-500 mr-2" />
                ) : (
                  <FaTimes className="text-red-500 mr-2" />
                )}
                One special character
              </li>
              <li className="flex items-center">
                {passwordStrength.uppercase ? (
                  <FaCheck className="text-green-500 mr-2" />
                ) : (
                  <FaTimes className="text-red-500 mr-2" />
                )}
                One uppercase letter
              </li>
              <li className="flex items-center">
                {passwordStrength.number ? (
                  <FaCheck className="text-green-500 mr-2" />
                ) : (
                  <FaTimes className="text-red-500 mr-2" />
                )}
                One number
              </li>
            </ul>
          </div>
    
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="relative">
              <label className="block text-gray-700">Password</label>
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
              <label className="block text-gray-700">Confirm Password</label>
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
            <p>Do you already have an account? <span onClick={onClick}
              className="text-blue-500 hover:underline hover:cursor-pointer">Log in</span></p>
          </div>
        </form></div>
      
      );
}

export default RegisterForm;







///////////////////////////////////////////////////////////////////////////////////////
