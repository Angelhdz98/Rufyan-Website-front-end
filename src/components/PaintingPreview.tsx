import { useState } from "react";
import { CiNoWaitingSign } from "react-icons/ci";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import obra2 from "../../public/assets/Images/imgObras/obra2.jpg";
import { Painting, PaintingPricing, PaintingStock, ProductTypeEnum } from "../types/typesIndex";
import { LikeButton } from "./LikeButton";
import PaintingPreviewButtonPanel from "./PaintingPreviewButtonPanel";

interface PaintingPreviewProps {
    paint: Painting;
}

const examplePaint: Painting =
{
    id: 1,
    name: "Paisaje Tranquilo",
    description: "Pintura al óleo de un paisaje sereno",
    productPricing: { pricePerOriginal: 1200, pricePerCopy: 400, pricingType: "ORIGINAL" },


    images: [{
        id: 1,
        productName: "una obra fea",
        url: obra2,
    }],
    productDomainDetails: { largoCm: 30, alturaCm: 50, creationDate: new Date("10-12-2020"), medium: "Aceite", supportMaterial: "Algodon", productType: ProductTypeEnum.PAINTING, },
    productStock: { stockType: "PAINTING_STOCK", availableCopies: 10, copiesMade: 15, isOriginalAvailable: true },

    isFavorite: true,
    productTypeEnum: ProductTypeEnum.PAINTING.toString()
}


function PaintingPreview({ paint }: PaintingPreviewProps) {

    const [originalSelected, setOriginalSelected] = useState(false);
    const navigate = useNavigate();

    //const dispatch = useDispatch<AppDispatch>();



    //const originalAvailable = true; // momentaneo para pruebas

    const handleClick = (id: number) => {
        console.log("Navegar a obra especifica")
        navigate(`/store/paintings/${id}`);
    }
    const toggleOnSelectedHandler = () => {
        setOriginalSelected(!originalSelected);
    }
    // cambiar el primer false por paint.original.available 
    const paintingStock = paint.productStock as PaintingStock;
    const paintingPricing = paint.productPricing as PaintingPricing;
    const availabilityTag = () => {

        return paintingStock.isOriginalAvailable ? <div className="flex">
            Original
            <IoIosCheckmarkCircle className="text-green-500 mt-1" />
        </div> : paintingStock.availableCopies > 0
            ?
            <div className="flex items-center" >
                Original
                <CiNoWaitingSign className="text-red-500 stroke-2 " />
            </div>
            : <div className="font-bold text-red-500">
                Sold out
            </div>;
    }
    const availableCopies = paintingStock.availableCopies > 0 ?
        <div className="Available-copies text-xs bg-white/70 absolute z-10 left-3 rounded px-1  bottom-12">Copies: {paintingStock.availableCopies}/{paintingStock.copiesMade}</div> :
        <div className="z-10  text-red-500 font-bold text-xs bg-white/70 absolute left-3 rounded px-1  bottom-12">No copies available</div>

    // cambiar este ultimo booleano por paint.original_availability 
    const renderedPrice = originalSelected ? (<div >Price original: <br /> {paintingPricing.pricePerOriginal}.00 MXN</div>) : (<div>Price p/copy: <br /> {paintingPricing.pricePerCopy}.00 MXN</div>);



    {/*`http://localhost:8080${paint.image[0].url}`*/ }

    return <div className="flex flex-col relative h-[90%] border-2 border-black rounded-2xl ">

        <img onClick={() => { handleClick(paint.id) }}
            className="rounded-t-2xl cursor-pointer object-cover h-full  "
            src={paint.images[0].url}
            alt={paint.images[0].productName} />
        <div
            className=" bg-slate-300 p-2 px-6 rounded-b-2xl h-[10%]">
            <PaintingPreviewButtonPanel paint={examplePaint} isOriginalSelected={false} />
        </div>
        <div className="flex gap-2 text-sm  original-available-tag absolute items-center z-10 bg-white/70 rounded top-2 left-4 px-1 ">
            {availabilityTag()}


        </div>
        {availableCopies}
        <div onClick={() => toggleOnSelectedHandler()} className="precios text-sm absolute z-20 right-2 top-2 bg-white/70 rounded-lg px-2 ">
            {renderedPrice}


        </div>
        <div className={`text-[#eb4b1b] rounded-md text-3xl absolute z-10 bottom-12 right-2   border bg-white/70  cursor-pointer `} >
            <LikeButton />
        </div>





        {/*<div className="prices absolute "></div>*/}

    </div>

}

export default PaintingPreview;
export { examplePaint };
