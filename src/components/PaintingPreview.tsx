import { Painting } from "../types/typesIndex";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PaintingPreviewProps {
    paint: Painting;
}



function PaintingPreview({ paint }: PaintingPreviewProps) {

    const [originalSelected, setOriginalSelected] = useState(false);
    const navigate= useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const addToCartHandler = (id: number, originalSelected: boolean) => {
        //dispatch();
        console.log("Agregar al carrito obra con ID: " + id + " original " + (originalSelected ? "sí" : "no"));
    }

    //const originalAvailable = true; // momentaneo para pruebas

    const handleClick = (id: number) => {
        console.log("Navegar a obra especifica")
        navigate(`/store/paintings/${id}`);
    }
    const toggleOnSelectedHandler = () => {
        setOriginalSelected(!originalSelected);
    }
    // cambiar el primer false por paint.original.available 
    const availabilityTag = paint.original_availability ? <div className="flex">
        Original
        <IoIosCheckmarkCircle className="text-green-500 mt-1" />
    </div> : paint.available_copies > 0
        ?
        <div className="flex items-center" >
            Original
            <CiNoWaitingSign className="text-red-500 stroke-2 " />
        </div>
        : <div className="font-bold text-red-500">
            Sold out
        </div>;

    const availableCopies = paint.available_copies > 0 ?
        <div className="Available-copies text-xs bg-white/70 absolute z-10 left-3 rounded px-1  bottom-12">Copies: {paint.available_copies}/{paint.copies_made}</div> :
        <div className="z-10 absolute text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-12">No copies available</div>

    // cambiar este ultimo booleano por paint.original_availability 
    const renderedPrice = originalSelected ? (<div >Price original: <br /> {paint.price}.00 MXN</div>) : (<div>Price p/copy: <br /> {paint.price_copy}.00 MXN</div>);

    {/*`http://localhost:8080${paint.image[0].url}`*/ }

    return <div className="flex flex-col relative h-[90%] border-2 border-black rounded-2xl ">
        <div className="h-full ">
            <img onClick={()=>{handleClick(paint.id)}} className="rounded-t-2xl cursor-pointer object-cover w-full h-[90%]  " src={paint.image[0].url}
                alt={paint.image[0].productName} />
            <div className=" bg-slate-300 p-2 px-6 rounded-b-2xl h-[10%]">
                <div className="flex flex-row justify-between ">

                    <BuyNowButton />
                    <AddToCartButton onClick = {()=>addToCartHandler(paint.id, originalSelected)} />
                </div>
            </div>
            <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 right-4 px-1 ">
                {availabilityTag}


            </div>
            {availableCopies}
            <div onClick={() => toggleOnSelectedHandler()} className="precios text-sm absolute z-20 right-2 bottom-12 bg-amber-500/80 rounded-lg px-2 ">{renderedPrice}

            </div>

        </div>




        {/*<div className="prices absolute "></div>*/}

    </div>

}

export default PaintingPreview; 
