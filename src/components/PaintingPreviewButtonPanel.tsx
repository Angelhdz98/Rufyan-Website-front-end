import { HtmlHTMLAttributes, useContext } from "react";
import { PaintingItemDetails, ProductDTO, ProductTypeEnum } from "../types/typesIndex";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { addCartItemRequest } from "./CartAndBuyRequests";
import { StorePageModalContext } from "../pages/galleryStore/StorePageModalContext";
import Cart from "../pages/cartPage/Cart";


export interface PanelButton extends HtmlHTMLAttributes<HTMLDivElement> {
    paint: ProductDTO
    isOriginalSelected: boolean
}

function PaintingPreviewButtonPanel({
    paint,
    isOriginalSelected,
}: PanelButton) {

    const modalContext = useContext(StorePageModalContext);

    const addToCartHandler = () => {
        const details: PaintingItemDetails = {
            isOriginalSelected,
            itemQuantity: 1,
            productType: ProductTypeEnum.PAINTING,
        };

        addCartItemRequest(paint.id, details)
            .then(() => {
                modalContext?.setIsModalOpen(true);

                const cart = <Cart />

                modalContext?.setModalContent(cart);

            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="flex flex-row justify-between w-full h-min">
            <BuyNowButton />
            <AddToCartButton onClick={addToCartHandler} />



        </div>
    );
}

export default PaintingPreviewButtonPanel