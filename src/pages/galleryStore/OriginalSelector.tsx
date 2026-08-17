import { useContext, useState } from "react";
import Button from "../../components/Button";

import { PaintingItemDetails, PricingTypeEnum } from "../../types/typesIndex";

import { ProductDTO, ProductTypeEnum } from "../../types/typesIndex";
import { addCartItemRequest } from "../../components/CartAndBuyRequests";
import { useParams } from "react-router-dom";

import Cart from "../cartPage/Cart";
import { StorePageModalContext } from "./StorePageModalContext";
//import { Painting } from "../../types/typesIndex";


function OriginalSelector(props: { product: ProductDTO }) {

    const [originalSelected, setOriginalSelected] = useState(true);
    const storePageModalContext = useContext(StorePageModalContext);




    const { id } = useParams();

    const selectedProductId = id == undefined ? 0 : parseInt(id);

    const paintingItemDetails: PaintingItemDetails = { isOriginalSelected: originalSelected, itemQuantity: 1, productType: ProductTypeEnum.PAINTING };

    const addToCartHandler = () => {
        addCartItemRequest(selectedProductId, paintingItemDetails)
            .then(() => {
                const cart = <Cart/>

                storePageModalContext?.setModalContent(cart);
                storePageModalContext?.setIsModalOpen(true);
 

            }
            )
            .catch((error) => {
                alert("Hubo un error con la petición: " + error);
            });

    }

    const selectOriginalHandler = () => {
        setOriginalSelected(true);
    }



    const selectCopyHandler = () => {
        setOriginalSelected(false);
    }
    if (props.product.productTypeEnum == ProductTypeEnum.PAINTING && props.product.productPricingDTO.pricingType == PricingTypeEnum.ORIGINAL) {
        //const painting = data[0] as Painting;
        return <div className="flex flex-col p-3">
            <div className="w-full flex justify-center p-1 text-[#c25f40] ">
                {originalSelected ? <span className="font-semibold">Original price: {props.product.productPricingDTO.pricePerOriginal} </span> : <span className="font-semibold">Copy price: {props.product.productPricingDTO.pricePerCopy}</span>}
                {/*originalSelected ? 
                    <span> {": " + painting.productPricing.}MXN </span> :
                    <span> {": " + painting.price_copy}MXN
                    </span>
                    */}

            </div>
            <hr className="border  border-[#c25f40] mb-2 -mt-1" />
            <div className="flex flex-row w-full gap-3">

                {
                    originalSelected ? <Button className="w-1/2 flex flex-row justify-center items-center" onClick={selectOriginalHandler} secondary rounded >
                        Original
                    </Button> :
                        <Button no_Bg rounded onClick={selectOriginalHandler}
                            className="bg-none text-[#D67254] w-1/2 flex flex-row justify-center items-center">
                            Original
                        </Button>
                }


                {!originalSelected ? <Button
                    className="w-1/2 flex flex-row justify-center items-center "
                    onClick={selectCopyHandler} secondary rounded >
                    Copy
                </Button> :
                    <Button onClick={selectCopyHandler} no_Bg rounded
                        className="bg-none text-[#D67254] w-1/2 flex flex-row justify-center items-center ">
                        Copy
                    </Button>
                }

            </div>


            <div className=" flex flex-row py-1  justify-center gap-16">
                <Button secondary rounded className="w-1/4 flex flex-row justify-center items-center">
                    Buy now
                </Button>
                {/**className="bg-none text-[#D67254] w-1/4 flex flex-row justify-center items-center" */}
                <Button primary rounded
                    onClick={addToCartHandler}
                >
                    Add to cart
                </Button>
            </div>

        </div>
    }
    return <div className="flex flex-col p-1 w-full">
        <div>
            <span>Price: {/*price()*/} </span>
            {/*originalSelected ? <span>{data[0]} </span> : <span></span>*/}
        </div>
        <div className="flex flex-row w-full gap-3">
            {originalSelected ? <Button className="w-1/2" onClick={selectOriginalHandler} secondary rounded >
                Original
            </Button> :
                <Button no_Bg rounded onClick={selectOriginalHandler}
                    className="bg-none text-[#D67254] w-1/2">
                    Original
                </Button>}

            {!originalSelected ? <Button className="w-1/2" onClick={selectCopyHandler} secondary rounded >
                Copy
            </Button> :
                <Button onClick={selectCopyHandler} no_Bg rounded
                    className="bg-none text-[#D67254] w-1/2 ">
                    Copy
                </Button>
            }

        </div>


        <div className=" flex flex-row p-2 justify-between">
            <Button secondary rounded>
                Buy now
            </Button>
            {/** bg-none text-[#D67254] */}
            <Button
            >
                Add to carrito
            </Button>
        </div>

    </div>
}

export default OriginalSelector;