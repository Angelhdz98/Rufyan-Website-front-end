import { Link, LinkProps } from "react-router-dom";
import className from "classnames";
interface CustomLinkProps extends LinkProps {

    className?: string;
}

export default function CustomLink({children, ...props}:CustomLinkProps){
   const  finalClasName= className(props.className, "hover:text-blue-900 hover:underline",{

   }) ;
   return <li className="list-none">
    <Link {...props} className={finalClasName} >{children}</Link>
    </li>;

}
    