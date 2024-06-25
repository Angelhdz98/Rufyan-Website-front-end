import { useState } from "react";
import FormInput from "./FormInput";
import { LogInRegisterProps } from "./RegisterForm";
import Logo from "./Logo";

function LogInForm({onClick}:LogInRegisterProps) {
    const [logData, setLogData ] = useState({
        data: {
            username:'',
            password:'',
        }
    })


    const handleChange=(e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setLogData((prevState)=>({...prevState,data:{
            ...prevState.data,
            [name]: value,
        },
    }));
    };

    return <div className=" flex flex-col w-full items-center gap-4">
        <Logo to="/" className="w-2/4 " />
        <form className="w-[50%]" >
            <div className="flex flex-col w-full">
                <div className="flex flex-col w-full">
            <FormInput type="text" value={logData.data.username} name="username" onChange={handleChange} >Username</FormInput>
            </div>
            <div className="flex flex-col w-full ">
                <FormInput type="password" value={logData.data.password} name="password" onChange={handleChange} >Password</FormInput>
            </div>
            
            </div>

        </form>

        <p className="mt-4">Don't have an account yet?
        <span className="text-blue-500 hover:underline hover:cursor-pointer" onClick={onClick}> register </span> 
        <span> now</span>
    </p>
    </div>
    }
    
    export default LogInForm;