import type { PaintingDomainDetails, Product } from "../types/typesIndex";
import classNames from "classnames";
//import Button from "./Button";
import { BiDownArrow } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime"
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";
import { HTMLAttributes } from "react";
export interface PaintLabelProps extends HTMLAttributes<HTMLDivElement>{
    paint: Product;
    hidden?: boolean;
    clicked?: boolean;
    isVisible: boolean;
}
 export const botoneraObra = ()=>{
        return (<div className="flex flex-row justify-between ">
            
            <BuyNowButton/>
            <AddToCartButton onClick={()=>{}}/>
    </div>)
    };

function PaintLabel({paint, clicked, isVisible, onClick }:PaintLabelProps) {
    const finalClassname= classNames("px-2 py-4 bg-white border-t-2  border-black  flex flex-col gap-0  w-full   transition-transform duration-300   box-border ",
        {
            "transform -translate-y-full absolute ":!isVisible,
            "transform   relative block ": isVisible,
            
        }
        )
        const paintingDomainDetails:PaintingDomainDetails = paint.productDomainDetails as PaintingDomainDetails;


    return <div className={finalClassname}
                onClick={ onClick}>
        <div>
            <span className="font-bold">{paint.name}</span>
        </div>
        <p className="text-xs">
            <span  >Technique:</span> <span>{}</span>  <br />
            <span>
            Measures: { paintingDomainDetails.largoCm} x {paintingDomainDetails.alturaCm} 
            </span> 
            <br />
            <span>Description: </span> <span>{paint.description}</span> 
            <br />
            {paint.productPricing && (<Fragment><span>Price Per Copy: </span> <span>{}</span> <br /> </Fragment>
                ) } 
        </p>
        {clicked ? botoneraObra(): <div className="flex flex-row place-self-center mt-1"><BiDownArrow className="text-[#CB3235]"/></div>  }
        
       { /*<div>
            <span className="text-orange-500 absolute top-0 right-1 font-bold text-xs">Price: {paint.price}.00 MXN</span>
        </div>*/}
    </div>
}


export default PaintLabel
