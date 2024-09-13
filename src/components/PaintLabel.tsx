import type { Painting } from "../types/typesIndex";
import classNames from "classnames";
import Button from "./Button";
import { BiDownArrow } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime"
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";
export interface PaintLabelProps{
    paint: Painting;
    hidden?: boolean;
    clicked?: boolean;
    isVisible: boolean;
}
 export const botoneraObra = ()=>{
        return (<div className="flex flex-row justify-between ">
            
            <BuyNowButton/>
            <AddToCartButton/>
    </div>)
    };

function PaintLabel({paint, clicked, isVisible }:PaintLabelProps) {
    const finalClassname= classNames("px-2 py-4 bg-white border-t-2  border-black  flex flex-col gap-0  w-full   transition-transform duration-300   box-border ",
        {
            "transform -translate-y-full absolute ":!isVisible,
            "transform   relative block ": isVisible,
            
        }
        )


    return <div className={finalClassname}>
        <div>
            <span className="font-bold">{paint.name}</span>
        </div>
        <p className="text-xs">
            <span  >Technique:</span> <span>{paint.medium}</span>  <br />
            <span>
            Measures: { paint.largo_cm} x {paint.altura_cm} 
            </span> 
            <br />
            <span>Description: </span> <span>{paint.description}</span> 
            <br />
            {paint.price_copy && (<Fragment><span>Price Per Copy: </span> <span>{paint.price_copy}</span> <br /> </Fragment>
                ) } 
        </p>
        {clicked ? botoneraObra(): <div className="flex flex-row place-self-center mt-1"><BiDownArrow className="text-[#CB3235]"/></div>  }
        
        <div>
            <span className="text-orange-500 absolute top-0 right-1 font-bold text-xs">Price: {paint.price}.00 MXN</span>
        </div>
    </div>
}


export default PaintLabel
