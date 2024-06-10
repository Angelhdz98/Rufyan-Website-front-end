import { Link, LinkProps } from "react-router-dom";
import classNames from "classnames";
interface CustomLinkProps extends LinkProps {

}

export default function CustomLink({children, ...props}:CustomLinkProps){
   const  finalClasName= classNames("hover:text-blue-900 hover:underline", props.className,{
    //aquí puede ir los casos por medio de cierto y falso 
   }) ;
   return <li className="list-none">
    <Link {...props} className={finalClasName} >{children}</Link>
    </li>;

}
    