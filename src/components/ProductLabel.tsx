import classNames from "classnames";
import { PaintingItemDetails, ProductTypeEnum, type Product } from "../types/typesIndex";
import Button from "./Button";
import DetailsTag from "./DetailsTag";
import AddToCartButton from "./AddToCartButton";
import Cart from "../pages/cartPage/Cart";
import { addCartItemRequest } from "./CartAndBuyRequests";
import { useContext } from "react";
import { StorePageModalContext } from "../pages/galleryStore/StorePageModalContext";
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

   /* const clickPriceHandler = () => {
        setIsOriginalSelected(!isOriginalSelected);
        console.log("El valor de isOriginalSelected: " + isOriginalSelected);
    }

    const [isOriginalSelected, setIsOriginalSelected] = useState(false);
    */
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
    const modalContext = useContext(StorePageModalContext);

    const addToCartHandler = () => {
        const details: PaintingItemDetails = {
            isOriginalSelected: true,
            itemQuantity: 1,
            productType: ProductTypeEnum.PAINTING,
        };

        addCartItemRequest(props.product.id, details)
            .then(() => {
                modalContext?.setIsModalOpen(true);

                const cart = <Cart />

                modalContext?.setModalContent(cart);

            })
            .catch((error) => console.error(error));
    }

    const botoneraObra = () => {
        return (<div className={"flex flex-row justify-between absolute w-[90%] bottom-1 " + props.className}>
            <AddToCartButton onClick={addToCartHandler} />
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

        <div className="p-2 mb-3">
            <DetailsTag productDetails={props.product.productDomainDetails} />
            {/*<PriceTag isOriginalSelected={isOriginalSelected} productPricing={props.product.productPricing}
                onClick={clickPriceHandler} 
            <StockTag productStock={props.product.productStock} className={"flex  w-full m-2 gap-5 justify-between"} />/>*/}
        </div>
    </div>
}

export default ProductLabel;