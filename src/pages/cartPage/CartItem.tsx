
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


    const paintingOriginalDiv = (isPainting(product)) ?<div className="option ">{(<div><span className={`cursor-pointer ${isCopy?"":"text-blue-600 underline underline-offset-2"} `}>Original</span> / <span className={`cursor-pointer ${isCopy?"text-blue-600 underline underline-offset-2":""}`} >Serialized print</span></div> )} 
    </div>: <div></div>

return <div className="flex flex-col  md:flex-row min-h-52 md:flex-grow lg:justify-start  h-fit    rounded-lg overflow-hidden shadow-lg ">
    <div className="1st-row w-full  md:h-full md:w-1/4 lg:w-1/6 max-w-1/3  object-contain"> 
        <img src={product.image[0].url} alt="" className="h-full w-full  " />
    </div>
    <div className=" 2nd-row w-3/5  flex flex-col  justify-between lg:justify-start   py-3 px-2 ">
    <div className="text-space p-2">
        <div className="product-title text-xl ">{product.name}</div>
        {paintingOriginalDiv}
        <div className="available-tag">Available</div>
    </div>

    <div className=" measure-pieces-box flex flex-col px-8">
   { isPainting(product)?<div className="flex flex-col"> Medidas: <span>{product.altura_cm}cm x {product.largo_cm}cm</span> </div>:""}
 
    </div>
   <div className="pieces flex flex-row px-2 justify-center  items-end  gap-8  ">
    <PiecesSelector className=""/> 
    <Button rounded primary className=" py-0 px-0 h-8 flex w-fit text-nowrap "  > Pay apart </Button>
    </div>
    

    </div>
    <div className=" 3rd-row relative flex w-2/12   ">
    <div className="absolute right-0 top-1/2 text-lg text-[#C04D2A]  -translate-y-1/2">
    {price()}
    </div>
    </div>
</div>
}


export default CartItem;

