import type { Painting } from "../types/typesIndex";
import classNames from "classnames";
import Button from "./Button";
export interface PaintLabelProps{
    paint: Painting;
    hidden?: boolean;
    clicked?: boolean;
}


function PaintLabel({paint, clicked }:PaintLabelProps) {
    const finalClassname= classNames("px-2 py-4 bg-white border-t-2 border-black relative flex flex-col gap-0 ",{})
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
            </span> <br />
            <span>Description: </span> <span>{paint.description}</span>   
        </p>
        {clicked && botoneraObra() }
        
        <div>
            <span className="text-orange-500 absolute top-0 right-1 font-medium text-xs">Price: {paint.price}.00MXN</span>
        </div>
    </div>
}

export default PaintLabel;