import { LogInRegisterProps } from "./RegisterForm";

function LogInForm({onClick}:LogInRegisterProps) {
    return <div>
        <p>Don't have an account yet?
        <span className="text-blue-500 hover:underline hover:cursor-pointer" onClick={onClick}> register </span> 
        <span> now</span>
    </p>
    </div>
    }
    
    export default LogInForm;