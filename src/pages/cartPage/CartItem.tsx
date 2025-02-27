
import exampleImage from "../../../public/assets/Images/imgObras/obra12.jpg"
import PiecesSelector from "../../components/PiecesSelector";

function CartItem(){
return <div className="flex flex-row h-52    rounded-lg overflow-hidden ">
    <div className="1st-row h-full w-auto max-w-1/3  object-cover border border-black"> 
        <img src={exampleImage} alt="" className="h-full w-full  " />
    </div>
    <div className=" 2nd-row w-3/5 border border-blue-600">
    <div className="text-space p-2">
        <div className="product-title text-xl ">Título</div>
        <div className="option ">Original / serialized print</div>
        <div className="available-tag">Available</div>
    </div>

    <div className=" measure-pieces-box flex flex-col px-8">
    <div className=""> Medidas</div>
    <div className="pieces">
    <PiecesSelector/>
    </div>
    </div>

    

    </div>
    <div className=" 3rd-row relative h-full w-2/12  border-lime-800 border-4">
    <div className="absolute right-0">
    price
    </div>
    </div>
</div>
}


export default CartItem;

