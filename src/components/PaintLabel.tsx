import type { Painting } from "../types/typesIndex";
import classNames from "classnames";
import Button from "./Button";
import { BiDownArrow } from "react-icons/bi";
import { Fragment } from "react/jsx-runtime";
export interface PaintLabelProps{
    paint: Painting;
    hidden?: boolean;
    clicked?: boolean;
    isVisible: boolean;
}


function PaintLabel({paint, clicked, isVisible }:PaintLabelProps) {
    const finalClassname= classNames("px-2 py-4 bg-white border-t-2  border-black  flex flex-col gap-0  w-full   transition-transform duration-300   box-border ",
        {
            "transform -translate-y-full absolute ":!isVisible,
            "transform   relative block ": isVisible,
            
        }
        )
    const botoneraObra = ()=>{
        return (<div className="flex flex-row justify-between mt-2">
        <Button primary rounded 
        className="text-xs px-1">
            Add to cart
            </Button> 
        <Button rounded secondary  
        className="text-xs px-1">
            Buy now
            </Button>
    </div>)
    };

    return <div className={finalClassname}>
        <div>
            <span className="font-bold">{paint.name}</span>
        </div>
        <p className="text-xs">
            <span  >Technique:</span> <span>{paint.specific_attributes.medium}</span>  <br />
            <span>
            Measures: { paint.specific_attributes.dimensions[0]} x {paint.specific_attributes.dimensions[1]} 
            </span> 
            <br />
            <span>Description: </span> <span>{paint.description}</span> 
            <br />
            {paint.specific_attributes.copy_price && (<Fragment><span>Price Per Copy: </span> <span>{paint.specific_attributes.copy_price}</span> <br /> </Fragment>
                ) } 
        </p>
        {clicked ? botoneraObra(): <div className="flex flex-row place-self-center mt-1"><BiDownArrow className="text-[#CB3235]"/></div>  }
        
        <div>
            <span className="text-orange-500 absolute top-0 right-1 font-bold text-xs">Price: {paint.price}.00 MXN</span>
        </div>
    </div>
}

export default PaintLabel;