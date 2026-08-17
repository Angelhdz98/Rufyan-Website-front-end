import { PaintingPricing, ProductPricing, SinglePricing } from "../types/typesIndex";

export interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
    productPricing: ProductPricing
    isOriginalSelected: boolean
    
}

function PriceTag(props: PriceTagProps) {
    let pricing: ProductPricing;
    let pricingTags;
    switch (props.productPricing.pricingType) {
        case "ORIGINAL":
            pricing =props.productPricing as PaintingPricing;
            pricingTags = <div className="flex flex-auto flex-col gap-1 ">
                {props.isOriginalSelected?
                <span>Original: ${pricing.pricePerOriginal}.00MXN</span>:
                <span>Copia: ${pricing.pricePerCopy}.00MXN</span>
            }
            </div>
            break;
        case "SIMPLE":
            pricing = props.productPricing as SinglePricing;
            pricingTags = <div>
                <span> precio: ${props.productPricing.price}</span>
            </div>
    }

    return <div  className="absolute top-2 px-1 right-4 z-10 bg-white/70 rounded-md" onClick={props.onClick}>
        {pricingTags}
    </div>


}

export default PriceTag;
