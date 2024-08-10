import classNames from "classnames";
import useNavigation from "../hooks/useNavigation";
import { MouseEvent, ReactNode } from "react";

interface LinkProps{
    to:string;
    children: ReactNode;
    className: string;
    activeClassName: string;
};

function Link({to,children, className, activeClassName}:LinkProps){

    const {navigate, currentPath} = useNavigation();
    const classes = classNames("text-blue-500",
    className, currentPath === to && activeClassName);
    const handleClick = (event: MouseEvent<HTMLAnchorElement>)=>{

        if(event.metaKey || event.ctrlKey){
            return; // De esta manera evitamos el eventPrevenDefaul y así se abré en otra pagina
        }
        event.preventDefault();
        navigate(to)
    }
    
    return <a className={classes} href={to} onClick={handleClick} >{children} </a>
}

export default Link; 