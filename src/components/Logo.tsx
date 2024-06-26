import { Link } from "react-router-dom";
import logoprovisionalRufyan from "../assets/Images/logos/logoprovisionalRufyan.png"
import classNames from "classnames";
import { LinkProps } from "react-router-dom";

interface LogoProps extends LinkProps{
}

function Logo({to, ...props}:LogoProps){
const  finalClasName= classNames("w-auto", props.className,{})
    return <div className={finalClasName}>
        <Link to={to}  >
    <img      src={logoprovisionalRufyan} alt="Logo"   />
    </Link>
</div>
}
export default Logo; 

