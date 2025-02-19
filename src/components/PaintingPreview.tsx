import { Painting } from "../types/typesIndex";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaintingPreviewButtonPanel from "./PaintingPreviewButtonPanel";
import obra2 from "../../public/assets/Images/imgObras/obra2.jpg"

interface PaintingPreviewProps {
    paint: Painting;
}

const examplePaint: Painting = 
    {
        id: 1,
        name: "Paisaje Tranquilo",
        description: "Pintura al óleo de un paisaje sereno",
        price: 1200.00,
        category: { id: 1, name: "painting", label: "Pintura" },
        favorite: false,
        creation_date: "2023-05-15",
        userId: 1,
        image: [{
            id: 1,
            productName: "una obra fea",
            url: obra2,
        }],
        largo_cm: 30,
        altura_cm:50,
        medium: "Aceite",
        support_material: "Papel algodon",
        certificate_of_authenticity: true,
        original_availability: true,
        price_copy: 200,
        available_copies: 11,
        copies_made: 15 ,
        available: true,
    }


function PaintingPreview({ paint }: PaintingPreviewProps) {

    const [originalSelected, setOriginalSelected] = useState(false);
    const navigate= useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    

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
        <div className="z-10  text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-12">No copies available</div>

    // cambiar este ultimo booleano por paint.original_availability 
    const renderedPrice = originalSelected ? (<div >Price original: <br /> {paint.price}.00 MXN</div>) : (<div>Price p/copy: <br /> {paint.price_copy}.00 MXN</div>);

    

    {/*`http://localhost:8080${paint.image[0].url}`*/ }

    return <div className="flex flex-col relative h-[90%] border-2 border-black rounded-2xl ">

            <img onClick={()=>{handleClick(paint.id)}} 
            className="rounded-t-2xl cursor-pointer object-cover h-full  " 
            src={paint.image[0].url}
            alt={paint.image[0].productName} />
            <div 
            className= " bg-slate-300 p-2 px-6 rounded-b-2xl h-[10%]">
               <PaintingPreviewButtonPanel  paint={examplePaint} isOriginalSelected={false} />
            </div>
            <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 right-4 px-1 ">
                {availabilityTag}


            </div>
            {availableCopies}
            <div onClick={() => toggleOnSelectedHandler()} className="precios text-sm absolute z-20 right-2 bottom-12 bg-amber-500/80 rounded-lg px-2 ">{renderedPrice}

            </div>

        




        {/*<div className="prices absolute "></div>*/}

    </div>

}

export default PaintingPreview; 
export  {examplePaint};
