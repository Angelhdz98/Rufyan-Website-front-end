import { Link } from "react-router-dom";
import nuevoLogo from "../../public/assets/Images/logos/LogoByRufyanRecortadoSinFondo.png"
import classNames from "classnames";
import { LinkProps } from "react-router-dom";

interface LogoProps extends LinkProps{
}

function Logo({to, ...props}:LogoProps){
const  finalClasName= classNames("w-auto", props.className,{})
    return <div className={finalClasName}>
        <Link to={to}  >
    <img      src={nuevoLogo} alt="Logo"   />
    </Link>
</div>
}
export default Logo; 

