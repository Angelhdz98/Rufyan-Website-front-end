import classNames from "classnames";
import type { Product } from "../types/typesIndex";
import Button from "./Button";
import PriceTag from "./PriceTag";
import StockTag from "./StockTag";
import DetailsTag from "./DetailsTag";
export interface ProductLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    product: Product;
    className?: string;
    hidden?: boolean;
    clicked?: boolean;
    onClick?: () => void;
    isVisible: boolean;
    isButtonsHidden?: boolean;

}


function ProductLabel(props: ProductLabelProps) {
    const finalClassname = classNames("px-2 py-2.5 bg-white border-t-2 border-black relative flex flex-col gap-0 ", props.className, {
        "hidden": !props.isVisible,
        "display block": props.isVisible,

    })

    /*   const priceTags = (() => {
           switch (product.productPricing.pricingType) {
               case "ORIGINAL": {
                   const paintingPrices = product.productPricing as PaintingPricing;
                   return <div className="">
                       <div> Precio original: ${paintingPrices.pricePerOriginal}
   
                       </div>
                       <div>
                           Precio por copia: ${paintingPrices.pricePerCopy}
                       </div>
   
                   </div>;
               }
               case "SIMPLE": {
                   const singlePrice = product.productPricing as SinglePricing;
                   return <div>
                       <div>
                           precio: ${singlePrice.price}
                       </div>
                   </div>
               }
   
               default:
   
           }
   
       }) */



    const botoneraObra = () => {
        return (<div className={"flex flex-row justify-between absolute w-[90%] bottom-1 " + props.className}>
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
            <span className="font-bold mt-0">{props.product.name}</span>
        </div>
        <p className="text-sm ">
            <span>{props.product.description}</span>
            <br />
        </p>
        {props.isButtonsHidden ? "" : botoneraObra()}

        <div className="p-2">
            <DetailsTag productDetails={props.product.productDomainDetails} className={" grid grid-cols-2  "} />
            <PriceTag productPricing={props.product.productPricing} />
            <StockTag productStock={props.product.productStock} className={"flex  w-full m-2 gap-5 justify-between"} />
        </div>
    </div>
}

export default ProductLabel;