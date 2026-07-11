import React from "react";
import Checker from "./Checker";
import { AddressDomain } from "../types/typesIndex";

export interface AddresCheckProps extends React.HTMLAttributes<HTMLDivElement>{
    selected:boolean
    address: AddressDomain
}

function AddressCheck(props: AddresCheckProps){

    return <div className=" flex flex-row hover:cursor-pointer" onClick={props.onClick}> 
    <div className="flex justify-center items-center w-1/5 ">
     <Checker selected={props.selected}  /> 
    </div>
    <div className="saved-addres-info">
        <span>{props.address.street+ " - "+ ", "+  (props.address.city? props.address.city + ", ":"")  + props.address.country } </span>
    </div>
    </div>
}

export default AddressCheck;