
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import PiecesSelector from "../../components/PiecesSelector";
import { CartItemDTORecord, PaintingItemDetails, ProductTypeEnum } from "../../types/typesIndex";

interface cartItemProps {
    cartItem: CartItemDTORecord;
    removeCartItem: (cartItemId: number) => void;
    addCartItem: (cartItem: CartItemDTORecord) => void;
}

function CartItem(props: cartItemProps) {

    const navigate = useNavigate();

    let paintingOriginalDiv;
    if (props.cartItem.details.productType == ProductTypeEnum.PAINTING) {
        const paintingItemDetails = props.cartItem.details as PaintingItemDetails;

        const paintingInfo = <div className="option ">
            {paintingItemDetails.isOriginalSelected ? "Original" : "Serialized copy"}
        </div>

        paintingOriginalDiv = props.cartItem.details.productType == ProductTypeEnum.PAINTING ? paintingInfo : <div></div>

    }



    return <div className="flex flex-col  md:flex-row min-h-52 md:flex-grow lg:justify-start  h-fit    rounded-lg overflow-hidden shadow-lg ">
        <div className="1st-row w-full  md:h-full md:w-1/4 lg:w-1/6 max-w-1/3  object-contain">

            <img src={props.cartItem.imageUrl} alt="" className="h-full w-full hover:cursor-pointer " onClick={() => navigate(`/store/product/${props.cartItem.productId}`)} />


        </div>
        <div className=" 2nd-row w-3/5  flex flex-col  justify-between lg:justify-start   py-3 px-2 ">
            <div className="text-space p-2">
                <div className="product-title text-xl ">{props.cartItem.productName}</div>
                {paintingOriginalDiv}
                <div className="available-tag">Available</div>
            </div>

            <div className=" measure-pieces-box flex flex-col px-8">


            </div>
            <div className="pieces flex flex-row px-2 justify-center  items-end  gap-8  ">
                <PiecesSelector className="" cartItem={props.cartItem} pieces={props.cartItem.details.itemQuantity} addCartItem={props.addCartItem} removeCartItem={props.removeCartItem} />
                <Button rounded primary className=" py-0 px-0 h-8 flex w-fit text-nowrap "  > Pay apart </Button>
            </div>


        </div>
        { /*   <div className=" 3rd-row relative flex w-2/12   ">
    <div className="absolute right-0 top-1/2 text-lg text-[#C04D2A]  -translate-y-1/2">
    {price()}
    </div>
    </div>*/}
        {/*<PriceTag productPricing={cartItem.details} /> */}
        <div>Total: {props.cartItem.totalPrice}</div>
    </div>
}


export default CartItem;

