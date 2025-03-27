
import { Fragment } from "react/jsx-runtime";
import exampleImage from "../../../public/assets/Images/imgObras/obra12.jpg"
import Button from "../../components/Button";
import PiecesSelector from "../../components/PiecesSelector";
import { Product } from "../../types/typesIndex";
import { isPainting } from "../../types/typesIndex";
interface cartItemProps{
    id:number;
    product: Product;
    quantity:number;
    isCopy:boolean;
}

function CartItem({product,quantity,isCopy}:cartItemProps){

    const price= () =>{
        if(isPainting(product)){
            
            if(!isCopy){
                return `Price: ${product.price}.00MXN`
            }else{
                return `Price: ${product.price_copy}.00MXN`
            }
            
        }else{
            return  `Price: ${product.price}.00MXN`
        }
    }

    const paintingOptionalDiv = (isPainting(product)) ?<div className="option ">Original / serialized print</div>: <Fragment/>

return <div className="flex flex-row h-52    rounded-lg overflow-hidden shadow-lg ">
    <div className="1st-row h-full w-auto max-w-1/3  object-cover"> 
        <img src={exampleImage} alt="" className="h-full w-full  " />
    </div>
    <div className=" 2nd-row w-3/5  flex flex-col justify-between py-3 px-2 ">
    <div className="text-space p-2">
        <div className="product-title text-xl ">{product.name}</div>
        {paintingOptionalDiv}
        <div className="available-tag">Available</div>
    </div>

    <div className=" measure-pieces-box flex flex-col px-8">
    <div className=""> Medidas: 30 cm por 30 cm</div>
    <div className="pieces flex flex-row px-2 justify-between  items-end   ">
    <PiecesSelector/> 
    <Button rounded primary className=" py-0 px-0 h-8"  > Pay apart </Button>
    </div>
    </div>

    

    </div>
    <div className=" 3rd-row relative h-full w-2/12  ">
    <div className="absolute right-0 text-lg text-[#C04D2A] p-2 py-3">
    {price()}
    </div>
    </div>
</div>
}


export default CartItem;

