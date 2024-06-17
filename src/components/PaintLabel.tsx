import type { Painting } from "../types/typesIndex";

export interface PaintLabelProps{
    paint: Painting;
}

function PaintLabel({paint}:PaintLabelProps) {
    return <div className="px-2 py-4 bg-white border-t-2 border-black relative flex flex-col gap-0">
        <div>
            <span className="font-bold">{paint.name}</span>
        </div>
        <p className="text-xs">
            <span >Technique:</span> <span>{paint.specific_attributes.medium}</span>  <br />
            <span>
            Measures: { paint.specific_attributes.dimensions[0]} x {paint.specific_attributes.dimensions[1]} 
            </span> <br />
            <span>Description: </span> <span>{paint.description}</span>   
        </p>
        <div>
            
        </div>
        <div>
            <p> </p>

        </div>
        <div>
            <span className="text-orange-500 absolute top-0 right-1 font-medium text-sm">Price: {paint.price}.00MXN</span>
        </div>
    </div>
}

export default PaintLabel;