import { useState,useEffect } from "react";
import { FaTimes,FaCheck,FaExclamationTriangle} from "react-icons/fa";

function LogInForm() {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        username: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: '',
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

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData({...formData,[name]:value});
    };
    useEffect(() => {
        // Simulación de la validación de disponibilidad del nombre de usuario
        if (formData.username) {
          setUsernameAvailable(formData.username !== 'RufyanOwner');
        } else {
          setUsernameAvailable(null);
        }
    
        // Validación de la contraseña
        const length = formData.password.length >= 6;
        const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
        const uppercase = /[A-Z]/.test(formData.password);
        const number = /[0-9]/.test(formData.password);
    
        setPasswordStrength({ length, specialChar, uppercase, number });
        setPasswordValid(length);
        setPasswordMatch(formData.password === formData.confirmPassword);
      }, [formData]);


    return  (
        <form className=" p-4 bg-white shadow-md rounded-lg w-full">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
            <div>
              <label className="block text-gray-700">Mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700">Address (Optional, just for shipment)</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
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
    
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
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
    
          <div className="text-center">
            <p>Do you already have an account? <a href="#" className="text-blue-500">Log in</a></p>
          </div>
        </form>
      );
}

export default LogInForm;