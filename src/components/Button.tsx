//import PropTypes from 'prop-types';
import className from "classnames";
import React from "react";

export interface buttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: string;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    warning?: boolean;
    danger?:boolean;
    outline?: boolean;
    rounded?: boolean; 
}


function Button ({children,    
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded, 
    ...rest 
}:buttonProps){
      
const finalClassName = className(rest.className, 'flex items-center px-2 border border-[3px]', {
    "border-[#C04D2A] bg-[#EBAF9D]/[.70] text-[#8B351C] font-bold" : primary,
    "border-[#D67254] bg-[#D67254] text-white font-bold" : secondary,
    "border-[#1D6720] bg-[#1D6720] text-white" : success,
    "border-yellow-500 bg-yellow-500 text-white" : warning,
    "border-red-500 bg-red-500 text-white" : danger,
    "rounded-xl": rounded,
    "bg-white": outline,
    "text-blue-500": outline && primary,
    "text-gray-900": outline && secondary,
    "text-green-500": outline && success,
    "text-yellow-500": outline && warning,
    "text-red-500": outline && danger,

});



        return <button {...rest} className={finalClassName} > {children} </button>
}

Button.propTypes= {
    checkVariation: ({primary, secondary, success, warning, danger }:buttonProps) =>{
        //console.log(props);
        const count = Number(!!primary) + Number(!!secondary) + Number(!!success) 
        + Number(!!warning) + Number(!!danger); 

        if(count >1){
            return new Error('Only one of primary, socondary, warning, danger can be true');
        }

        
    }
}

export default Button