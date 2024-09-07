import { Painting } from "../types/typesIndex";
import { IoIosCheckmarkCircle } from "react-icons/io";

import { CiNoWaitingSign } from "react-icons/ci";

interface PaintingPreviewProps {
    paint: Painting;
}


function PaintingPreview({paint}:PaintingPreviewProps){

    const originalAvailable= true; // momentaneo para pruebas

    // cambiar el primer false por paint.original.available 
    const availabilityTag= originalAvailable ? <div  className="flex">Original <IoIosCheckmarkCircle className="text-green-500 mt-1" /> </div> : paint.available_copies > 0 ? <div className="flex items-center" >Original <CiNoWaitingSign className="text-red-500 stroke-2 "  /></div>  : <div className="font-bold text-red-500">Sold out</div>  ;

    const availableCopies =  paint.available_copies>0 ? 
    <div className="Available-copies text-xs bg-white/70 absolute z-10 left-3 rounded px-1  bottom-1">Copies: {paint.available_copies}/{paint.copies_made}</div> 
    :  originalAvailable ? 
    <div className="z-10 absolute text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-1">No copies available</div>
    : <div></div> 
    // cambiar este ultimo booleano por paint.original_availability 
    

    

    return <div className="relative "> <img className="rounded-2xl  " src={`http://localhost:8080${paint.image[0].url}` } alt={paint.image[0].productName} /> 
    <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 right-4 px-1 ">
         {availabilityTag} 
        </div>

        {availableCopies}
    {/*<div className="prices absolute "></div>*/}

    </div>

}

export default PaintingPreview; 