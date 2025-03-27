import React from "react";
import Checker from "./Checker";
import { UserAddress } from "../types/typesIndex";

export interface AddresCheckProps extends React.HTMLAttributes<HTMLDivElement>{
    selected:boolean
    address: UserAddress
}

function AddressCheck(props: AddresCheckProps){

    return <div className=" flex flex-row hover:cursor-pointer" onClick={props.onClick}> 
    <div className="flex justify-center items-center w-1/5 ">
     <Checker selected={props.selected}  /> 
    </div>
    <div className="saved-addres-info">
        <span>{props.address.addressLine1+ " - "+ props.address.neighborhood+ ", "+  (props.address.city? props.address.city + ", ":"")+ props.address.state+", " + props.address.country } </span>
    </div>
    </div>
}

export default AddressCheck;