import React from "react";
import useNavigation from "../../hooks/useNavigation";

interface RouteProps{
    path:string;
    children: React.ReactNode

}
function Route({path, children}:RouteProps){
const {currentPath} =useNavigation(); //para usar una pieza de estado del context
if (path === currentPath){
    return children;
}
return null; 
}

export default Route;