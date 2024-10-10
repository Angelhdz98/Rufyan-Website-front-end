import { Painting, Product } from "../types/typesIndex";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { CiNoWaitingSign } from "react-icons/ci";
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";

interface ProductPreviewProps {
    product: Product;
}


function ProductPreview({product}:ProductPreviewProps){
    

    const originalAvailable= true; // momentaneo para pruebas

    const handleClick = () =>{
        console.log("Navegar a obra especifica")
    }
    // cambiar el primer false por paint.original.available 
    const availabilityTag= originalAvailable ? <div  className="flex">Availability:  <IoIosCheckmarkCircle className="text-green-500 mt-1" /> </div> : <div className="flex items-center" >Availability: <CiNoWaitingSign className="text-red-500 stroke-2 "  /></div>;

    

/*    const availableCopies =  paint.available_copies>0 ? 
    <div className="Available-copies text-xs bg-white/70 absolute z-10 left-3 rounded px-1  bottom-1">Copies: {paint.available_copies}/{paint.copies_made}</div> 
    :  originalAvailable ? 
    <div className="z-10 absolute text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-1">No copies available</div>
    : <div></div> 
    // cambiar este ultimo booleano por paint.original_availability 
  */  

    {/*src={`http://localhost:8080${product.image[0].url}` }*/ }

    return <div className="relative h-[90%] flex flex-col border-2 border-black rounded-2xl"> 
    <img className="rounded-t-2xl curosr-pointer object-cover h-full " 
    src={product.image[0].url}
    alt={product.image[0].productName} /> 
    <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 right-4 px-1 ">
         {availabilityTag} 
        </div>

        
    {/*<div className="prices absolute "></div>*/}
    {/** bg-slate-300 m-0 px-6 rounded-b-2xl h-[10%] */}
    <div className="bg-slate-300 p-2 px-6 rounded-b-2xl h-[10%] ">
        <div className="flex flex-row justify-between ">
            
            <BuyNowButton />
            <AddToCartButton onClick={function (): void {
                    throw new Error("Function not implemented.");
                } }  />
    </div>
    </div>
    

    </div>

}

export default ProductPreview; 
