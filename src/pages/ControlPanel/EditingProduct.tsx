import { HTMLAttributes } from "react";
import { isPainting } from "../../hooks/isPainting";
import { Product } from "../../types/typesIndex";


export interface EditingProductProps extends HTMLAttributes<HTMLDivElement> {
product: Product;
}

function EditingProduct({product, ...rest}:EditingProductProps){


    
/*
if(isPainting(product)){
    return <EditingPainting/>
}
*/

   // else{
        return <div>
            painting
        </div>
    //} 
}

export default EditingProduct;