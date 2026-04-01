import { PaintingPricing, ProductPricing, SinglePricing } from "../types/typesIndex";

export interface PriceTagProps{
    productPricing:ProductPricing
}

function PriceTag({productPricing}: PriceTagProps) {
    let pricing: ProductPricing;
    let pricingTags;
    switch (productPricing.pricingType) {
        case "ORIGINAL":
            pricing = productPricing as PaintingPricing;
            pricingTags = <div className="flex flex-auto flex-row ">
                <span>Obra original: ${pricing.pricePerOriginal}.00MXN</span>
                <span>Copia seriada: ${pricing.pricePerCopy}.00MXN</span>
            </div>
            break;
        case "SINGLE_PRICE":
            pricing = productPricing as SinglePricing;
            pricingTags = <div>
                <span> precio: ${productPricing.price}</span>
            </div>
    }

    return <div className="absolute top-2 px-1 right-4 z-10 bg-white/70 rounded-md">
        {pricingTags}
    </div>


}

export default PriceTag;
