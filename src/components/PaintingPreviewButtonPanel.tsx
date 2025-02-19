import { HtmlHTMLAttributes } from "react";
import { Painting } from "../types/typesIndex";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";

export interface PanelButton extends HtmlHTMLAttributes<HTMLDivElement> {
    paint: Painting
    isOriginalSelected: boolean
}

function PaintingPreviewButtonPanel ({paint, ...rest}:PanelButton){

    const addToCartHandler = (id: number, originalSelected: boolean) => {
        //dispatch();
        console.log("Agregar al carrito obra con ID: " + id + " original " + (originalSelected ? "sí" : "no"));
    }

    return   <div className={"flex flex-row justify-between w-full "+ rest.className}>

    <BuyNowButton />
    <AddToCartButton onClick = {()=>addToCartHandler(paint.id, rest.isOriginalSelected)} />
</div>
}

export default PaintingPreviewButtonPanel;