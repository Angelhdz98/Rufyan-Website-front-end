import type { Painting } from "../types/typesIndex";

export interface PaintLabelProps{
    paint: Painting;
}

function PaintLabel({paint}:PaintLabelProps) {
    return <div className="p-2 bg-white">
        <div>
            <span>{paint.name}</span>
        </div>
        <div>
            <span>Technique:</span> <span>{paint.specific_attributes.medium}</span>   
        </div>
        <div>
            <span>
            measures: { paint.specific_attributes.dimensions[0]} x {paint.specific_attributes.dimensions[1]} 
            </span> 
        </div>
        <div>
            <p> <span>Description</span> <span>{paint.description}</span> </p>

        </div>
        <div>
            <span>price {paint.price}</span>
        </div>
    </div>
}

export default PaintLabel;