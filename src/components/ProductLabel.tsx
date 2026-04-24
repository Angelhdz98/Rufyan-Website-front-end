import classNames from "classnames";
import type { PaintingPricing, Product, SinglePricing } from "../types/typesIndex";
import Button from "./Button";
//import { BiDownArrow } from "react-icons/bi";
//import { Fragment } from "react/jsx-runtime";
export interface ProductLabelProps {
    product: Product;
    className?: string;
    hidden?: boolean;
    clicked?: boolean;
    onClick?: () => void;
    isVisible: boolean;
}


function ProductLabel({ product, className, isVisible }: ProductLabelProps) {
    const finalClassname = classNames("px-2 py-2.5 bg-white border-t-2 border-black relative flex flex-col gap-0 ", className, {
        "hidden": !isVisible,
        "display block": isVisible,

    })

    const priceTags = (() => {
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

    })



    const botoneraObra = () => {
        return (<div className="flex flex-row justify-between absolute w-[90%] bottom-1">
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
            <span className="font-bold mt-0">{product.name}</span>
        </div>
        <p className="text-xs">
            <span>{product.description}</span>
            <br />
        </p>
        {botoneraObra()}

        <div>
            {priceTags()
                /* <span className="text-orange-500 absolute top-0 right-1 font-bold text-xs">Price: {product.price}.00 MXN</span>*/
            }
        </div>
    </div>
}

export default ProductLabel;